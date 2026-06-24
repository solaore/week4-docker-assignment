# Assignment 1 — Build a Multi-Container Stack with Docker Compose

🟡 **Intermediate** · Practical

---

## 🎯 Goal

Run a **Hello DevOps** web app and a **PostgreSQL database** together using Docker Compose. The app must:

1. Reach the database **by service name** (not an IP address) — proving container networking.
2. Use a **named volume** so the database data **survives a restart** — proving persistence.

This app is not just "hello world" — it records every visit in the database and shows a counter. That counter is how you prove networking and persistence actually work.

---

## 📁 Files in this folder

```
assignment-1-compose-stack/
├── docker-compose.yml        # defines the app + db services, network, volume
├── README.md                 # this file
└── app/
    ├── Dockerfile            # builds the Node.js app image
    ├── package.json          # app dependencies (pg)
    └── app.js                # the Hello DevOps app
```

Everything is already written for you. Your job is to **run it, understand it, prove it works, and explain it.**

---

## ▶️ How to run it

From inside this folder:

```bash
# Build the app image and start both containers
docker compose up -d --build

# Confirm both services are running
docker compose ps

# Test the app
curl http://localhost:3000
```

You should see:
```
Hello DevOps! 🚀
This app is talking to its database by name.
You are visit number 1.
```

Refresh / curl again — the count goes **up** each time. That means the app is successfully writing to the database **over the network**.

---

## 🧪 Prove persistence (the most important step)

```bash
# 1. Hit the app a few times so the counter climbs (e.g. to 5)
curl http://localhost:3000
curl http://localhost:3000
curl http://localhost:3000

# 2. Tear DOWN the stack — but keep the volume (no -v flag)
docker compose down

# 3. Bring it back up
docker compose up -d

# 4. Hit the app again
curl http://localhost:3000
```

✅ **If the counter CONTINUES** from where it left off → your volume is working, data persisted.
❌ **If the counter RESETS to 1** → the volume is misconfigured and data was lost.

---

## 📤 What to submit

In this folder, you must end up with:

1. ✅ The working files (already here — keep them)
2. ✅ A `screenshots/` folder containing:
   - `01-compose-ps.png` — output of `docker compose ps` showing both services up
   - `02-app-running.png` — `curl http://localhost:3000` showing the visit count
   - `03-persistence.png` — the counter **continuing** after `down` → `up`
3. ✅ Your answers filled into the **Reflection** section below

---

## 📝 Reflection (fill this in)

> Replace the prompts below with your own answers.

**1. What does each service in the `docker-compose.yml` do?**
- `app`:
- `db`:

**2. How is the app able to reach the database by name?**
(Hint: look at `DB_HOST` in the compose file and the service names.)


**3. What exact path is the volume mounted to, and why must it be that path?**
(Hint: where does PostgreSQL store its data?)


**4. What happens to your data if you run `docker compose down -v` instead of `docker compose down`?**


---

## 🧹 Cleanup (when you're done)

```bash
docker compose down -v       # removes containers, network, AND the volume
```

---

## 💡 Hints

- `docker compose logs app` — see the app's logs if something breaks
- `docker compose logs db` — see the database logs
- If the app says *"Could not reach the database"*, the db may still be starting — wait a few seconds and try again.
- The app reaches the db using `DB_HOST: db` — `db` is the **service name**, which Compose turns into a network hostname automatically.

---

*Aretix Labs · Cloud & DevOps Mentorship · Week 4 · Assignment 1*
