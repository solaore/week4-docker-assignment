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
- **What was wrong: "psql: error: connection to server at "db" (172.19.0.3), port 5432 failed: FATAL:  database "labdb" does not exist **
- **How I found it: Ran psql -h db -U postgres -d labdb command **
- **How I fixed it: Added POSTGRES_DB = labdb **

## Bug 4
- **What was wrong: The application couldn't connect to the database. It threw the error "psql: error: could not translate host name 'db' to address: Name or service not known" **
- **How I found it: Ran the command "psql -h db -U postgres -d labdb" **
- **How I fixed it: Added networks to the DB service so it can communicate with the APP service **

## Bug 5
- **What was wrong: After tearing down and bringing up the app, all the data was lost. The table was non-existent**
- **How I found it: I got the error " ERROR:  relation 'students' does not exist "**
- **How I fixed it: I modified the volume path declared in the db service for persistent data storage from /var/lab/postgresql/data to /var/lib/postgresql/data, which is where postgres actually writes its files into**

## 🔍 The Silent Bug (most important)

One of these bugs let the container **start successfully** but silently failed to do its job.

- **Which bug was it?: Bug 5 **

- **Why did the container still start without any error?: Both individual processes ran successfully. Docker's job is to create the path /var/lab/postgresql/data (if it doesn't already exist) and attach the volume there, which it did successfully. Likewise, PostgreSQL initialises a fresh database at /var/lib/postgresql/data, which was also done successfully, just not backed by the named volume **

- **How did you PROVE the data was not actually persisting?**
Ran the command (psql -h db -U postgres -d labdb -c "SELECT * FROM students;") after tearing down the container and bringing it back up but it didn't return the data that was initially created.

---

## ✅ Final Working `docker-compose.yml`

```yaml
# Paste your corrected, working compose file here
services:

  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: labpass
      POSTGRES_DB: labdb
    volumes:
      - db-data:/var/lib/postgresql/data
    networks:
      - app-net

  app:
    image: ubuntu
    command: sleep 3600
    networks:
      - app-net

networks:
  app-net:

volumes:
  db-data:
```

---

## 💭 What I Learned

(2–3 sentences on what this lab taught you about debugging Docker Compose.)
This lab has helped me with an understanding of how services within the same network communicate. It has also helped me understand better the idea behind persistent volume storage and how important it is to declare the right path when creating volumes.

---

*Aretix Labs · Cloud & DevOps Mentorship · Week 4 · Assignment 2*
