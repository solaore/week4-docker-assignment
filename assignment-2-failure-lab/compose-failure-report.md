# Compose Failure Lab — Bug Report

> Fill this in as you find and fix each bug. Be specific.

---

## Bug 1
- **What was wrong: Got the error "networks must be a mapping"**
- **How I found it (what error or symptom?): Ran the docker compose -f docker-compose.broken2.yml up -d command**
- **How I fixed it: I modified the part where networks were declared in the .yml file  and made it into a mapping instead of a list (- app-net) **

## Bug 2
- ** What was wrong: Got the error "volumes must be a mapping" **
- ** How I found it: Ran the docker compose -f docker-compose.broken2.yml up -d command again **
- ** How I fixed it: I modified the part where volumes were declared in the .yml file  and made it into a mapping instead of a list (- db-data) **

## Bug 3
- **What was wrong: psql: error: connection to server at "db" (172.19.0.3), port 5432 failed: FATAL:  database "labdb" does not exist **
- **How I found it: Ran psql -h db -U postgres -d labdb command **
- **How I fixed it: Added POSTGRES_PASSWORD = DB **

## Bug 4
- **What was wrong:**
- **How I found it:**
- **How I fixed it:**

## Bug 5
- **What was wrong:**
- **How I found it:**
- **How I fixed it:**

---

## 🔍 The Silent Bug (most important)

One of these bugs let the container **start successfully** but silently failed to do its job.

- **Which bug was it?**

- **Why did the container still start without any error?**

- **How did you PROVE the data was not actually persisting?**

---

## ✅ Final Working `docker-compose.yml`

```yaml
# Paste your corrected, working compose file here

```

---

## 💭 What I Learned

(2–3 sentences on what this lab taught you about debugging Docker Compose.)


---

*Aretix Labs · Cloud & DevOps Mentorship · Week 4 · Assignment 2*
