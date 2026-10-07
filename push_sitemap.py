#!/usr/bin/env python3
"""Single-commit push of regenerated sitemap files via Git Trees API.
Resumable: blob SHAs persist to blobs_state.json."""
import base64, json, os, subprocess, sys, time
from concurrent.futures import ThreadPoolExecutor

sys.path.insert(0, "/opt/hatch/skills/skill-creator/bin")
from dynamic_credentials import dynamic_credential_entry

OWNER = "chicomills1-create"
REPO = "engineering-precision"
BRANCH = "migration/apex-fix"
BASE = "https://api.github.com"
UA = ("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/126.0 Safari/537.36")
HERE = os.path.dirname(os.path.abspath(__file__))
WORKDIR = os.path.join(HERE)  # repo root is HERE (sitemap-cleanup)
STATE = os.path.join(HERE, "blobs_state.json")

entry = dynamic_credential_entry("custom.github", "access_token")
SURR = str(entry["surrogate"]).strip()
PLACEMENT = entry.get("placement")

def api(method, path, body=None, timeout=120):
    cmd = ["curl", "-sS", "-X", method, BASE + path,
           "-H", "Accept: application/vnd.github+json",
           "-H", f"User-Agent: {UA}",
           "-H", "X-GitHub-Api-Version: 2022-11-28",
           "--max-time", str(timeout)]
    if PLACEMENT == "bearer_header":
        cmd += ["-H", f"Authorization: Bearer {SURR}"]
    if body is not None:
        cmd += ["-H", "Content-Type: application/json", "-d", "@-"]
        data = json.dumps(body)
    else:
        data = None
    for attempt in range(4):
        p = subprocess.run(cmd, input=data, capture_output=True, text=True)
        if p.returncode == 0 and p.stdout.strip():
            try:
                return json.loads(p.stdout)
            except json.JSONDecodeError:
                pass
        time.sleep(5 * (attempt + 1))
    sys.exit(f"API FAILED {method} {path}: rc={p.returncode} err={p.stderr[:200]} out={p.stdout[:200]}")

def upload_blob(item):
    repo_path, local_path = item
    with open(local_path, "rb") as f:
        content = base64.b64encode(f.read()).decode()
    payload = json.dumps({"content": content, "encoding": "base64"})
    last_err = ""
    for attempt in range(8):
        cmd = ["curl", "-sS", "-X", "POST", BASE + f"/repos/{OWNER}/{REPO}/git/blobs",
               "-H", "Accept: application/vnd.github+json",
               "-H", f"User-Agent: {UA}",
               "-H", "X-GitHub-Api-Version: 2022-11-28",
               "--max-time", "240"]
        if PLACEMENT == "bearer_header":
            cmd += ["-H", f"Authorization: Bearer {SURR}"]
        cmd += ["-H", "Content-Type: application/json", "-d", "@-"]
        p = subprocess.run(cmd, input=payload, capture_output=True, text=True)
        if p.returncode == 0 and p.stdout.strip():
            try:
                return repo_path, json.loads(p.stdout)["sha"]
            except (json.JSONDecodeError, KeyError):
                last_err = f"parse: {p.stdout[:120]}"
        else:
            last_err = f"rc={p.returncode} err={p.stderr[:120]} out={p.stdout[:120]}"
        time.sleep(8 * (attempt + 1))
    sys.exit(f"blob upload failed: {repo_path} :: {last_err}")

def collect_changed():
    """Parse git status for changed files. Returns (upserts, deletes)."""
    p = subprocess.run(["git", "status", "--porcelain"], cwd=HERE,
                       capture_output=True, text=True)
    upserts, deletes = [], []
    for line in p.stdout.splitlines():
        if not line.strip():
            continue
        code = line[:2]
        path = line[3:].strip().strip('"')
        # handle renames: "R  old -> new"
        if " -> " in path:
            path = path.split(" -> ")[1].strip()
        full = os.path.join(HERE, path)
        if code.strip() == "D":
            deletes.append(path)
        elif os.path.isfile(full):
            upserts.append((path, full))
    return upserts, deletes

def load_state():
    if os.path.exists(STATE):
        return json.load(open(STATE))
    return {}

def save_state(st):
    tmp = STATE + ".tmp"
    json.dump(st, open(tmp, "w"))
    os.replace(tmp, STATE)

def main():
    upserts, deletes = collect_changed()
    print(f"upserts: {len(upserts)} | deletes: {len(deletes)}", flush=True)
    state = load_state()
    pending = [(rp, lp) for rp, lp in upserts if rp not in state]
    print(f"already uploaded: {len(state)} | pending: {len(pending)}", flush=True)
    if pending:
        done = [0]
        def one(item):
            rp, sha = upload_blob(item)
            state[rp] = sha
            done[0] += 1
            if done[0] % 25 == 0:
                save_state(state)
                print(f"  blobs {done[0]}/{len(pending)}", flush=True)
            return rp
        with ThreadPoolExecutor(max_workers=8) as ex:
            list(ex.map(one, pending))
        save_state(state)
        print(f"all {len(state)} blobs uploaded", flush=True)
    missing = [rp for rp, _ in upserts if rp not in state]
    if missing:
        sys.exit(f"STILL MISSING {len(missing)} blobs — rerun")
    head = api("GET", f"/repos/{OWNER}/{REPO}/git/ref/heads/{BRANCH}")
    head_sha = head["object"]["sha"]
    print("branch head:", head_sha[:12], flush=True)
    tree = [{"path": rp, "mode": "100644", "type": "blob", "sha": state[rp]}
            for rp, _ in sorted(upserts)]
    for dp in sorted(deletes):
        tree.append({"path": dp, "mode": "100644", "type": "blob", "sha": None})
    print(f"tree entries: {len(tree)}", flush=True)
    tr = api("POST", f"/repos/{OWNER}/{REPO}/git/trees",
             {"base_tree": head_sha, "tree": tree}, timeout=300)
    print("tree:", tr["sha"][:12], flush=True)
    msg = ("SEO: regenerate sitemaps after thin-family removal "
           "(2.15M -> 469K URLs; franchise/verticals/projects/buildings/specialties-t2 removed)")
    cm = api("POST", f"/repos/{OWNER}/{REPO}/git/commits",
             {"message": msg, "tree": tr["sha"], "parents": [head_sha]}, timeout=120)
    print("commit:", cm["sha"][:12], flush=True)
    up = api("PATCH", f"/repos/{OWNER}/{REPO}/git/refs/heads/{BRANCH}", {"sha": cm["sha"]}, timeout=60)
    print("branch updated:", BRANCH, "->", up["object"]["sha"][:12], flush=True)
    chk = api("GET", f"/repos/{OWNER}/{REPO}/git/ref/heads/{BRANCH}")
    assert chk["object"]["sha"] == cm["sha"], "ref did not move!"
    print("REF VERIFIED at", cm["sha"][:12])
    print("DONE")

if __name__ == "__main__":
    main()
