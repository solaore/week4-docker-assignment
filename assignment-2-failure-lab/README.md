# Assignment 2 — The Broken Compose Failure Lab

🔴 **Stretch** · Debugging

---

## 🎯 Goal

The file `docker-compose.broken.yml` in this folder is **deliberately broken.** It contains **5 bugs.**

Your job:
1. Find every bug.
2. Fix them all.
3. Get the stack running.
4. **Prove the database persists** after a restart.
5. Document everything in `compose-failure-report.md`.

This is how real DevOps work feels — you inherit something broken and you make it work.

---

## 📁 Files in this folder

```
assignment-2-failure-lab/
├── docker-compose.broken.yml    # the broken file — fix this
├── compose-failure-report.md    # fill this in as you debug
└── README.md                    # this file
```

---

## ▶️ How to work through it

```bash
# Try to run the broken file — watch it fail
docker compose -f docker-compose.broken.yml up -d
```

Read the errors carefully. Fix one bug at a time. Re-run after each fix. Some bugs throw loud errors. **At least one bug lets the stack start successfully but silently misbehaves** — that's the one you have to think hardest about.

Once it works, connect to the database to test it:
```bash
# Exec into the app container
docker compose exec app bash

# Install the postgres client (ubuntu image doesn't have it)
apt update && apt install -y postgresql-client

# Connect to the database BY SERVICE NAME
psql -h db -U postgres -d labdb
```

Inside `psql`:
```sql
CREATE TABLE students (id SERIAL, name TEXT);
INSERT INTO students (name) VALUES ('Ore'), ('Chisom');
SELECT * FROM students;
\q
```

---

## 🧪 Prove persistence

```bash
# Tear down (keep the volume)
docker compose down

# Bring it back up
docker compose up -d

# Connect again and check your data
docker compose exec app bash
apt update && apt install -y postgresql-client
psql -h db -U postgres -d labdb -c "SELECT * FROM students;"
```

✅ Ore and Chisom should **still be there.**
❌ If the table is gone, one of the bugs is still unfixed.

---

## ⚠️ A Big Hint

There is one bug that is **not** a syntax error. The stack will run with it. But your data will **silently vanish** every time you restart.

> When you mount a volume, the path inside the container must match **exactly** where the program stores its data. If it's even slightly wrong, Docker happily creates the path you asked for, mounts your volume there — and the program writes its real data somewhere else entirely.

Where does PostgreSQL actually store its data? Check the path in the broken file very carefully, character by character.

---

## 📤 What to submit

1. ✅ Your fixed, working compose file (rename it to `docker-compose.yml`)
2. ✅ A completed `compose-failure-report.md` documenting all 5 bugs
3. ✅ Keep the original `docker-compose.broken.yml` so we can see the before/after

---

## 💡 Debugging commands

```bash
docker compose -f <file> config     # validates the file & shows the parsed result
docker compose logs db              # database logs
docker compose logs app             # app logs
docker compose ps                   # what's running
docker volume ls                    # see your volumes
```

`docker compose config` is your best friend — it catches the mapping/list errors instantly.

---

*Aretix Labs · Cloud & DevOps Mentorship · Week 4 · Assignment 2*
