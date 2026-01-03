# 🔒 Security & Environment Setup Guide

## ⚠️ IMPORTANT: Before Pushing to GitHub

This project contains sensitive information that **MUST NOT** be committed to GitHub. Follow this guide carefully.

---

## 📋 Quick Checklist

Before pushing to GitHub, ensure:

- [ ] `.env` files are listed in `.gitignore` ✅ (Already configured)
- [ ] `.env.example` files are created ✅ (Already created)
- [ ] No actual credentials in documentation files ✅ (Already sanitized)
- [ ] Test output files are ignored ✅ (Already configured)
- [ ] Database backups are ignored ✅ (Already configured)

---

## 🔐 Environment Variables Setup

### Step 1: Root Directory `.env`

Create a `.env` file in the **root directory** with your actual credentials:

```env
# Database Configuration
DATABASE_URL="postgresql://your-username:your-password@your-host:port/your-database?sslmode=require"

# NextAuth Configuration
NEXTAUTH_SECRET=your-actual-secret-key
NEXTAUTH_URL=http://localhost:3000

# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
NODE_ENV=development
```

**How to generate NEXTAUTH_SECRET:**
```bash
# Using OpenSSL (recommended)
openssl rand -base64 32

# Or using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Step 2: Server Directory `.env`

Create a `.env` file in the **server** directory:

```env
# Database Configuration (same as root .env)
DATABASE_URL="postgresql://your-username:your-password@your-host:port/your-database?sslmode=require"

# Server Configuration
NODE_ENV=development
PORT=3001
```

---

## 🚫 Files Already Protected by .gitignore

The following sensitive files/folders are **automatically ignored**:

### Environment Files
- `.env`
- `.env.local`
- `.env.development`
- `.env.production`

### Database Files
- `backups/`
- `*.sql`
- `*.dump`
- `*.backup`

### Logs
- `logs/`
- `*.log`

### Test Files
- `test-output.txt`
- `*.tmp`
- `*.temp`

### Dependencies
- `node_modules/`

### Build Files
- `.next/`
- `/out/`
- `/build/`

---

## ✅ Safe to Commit

The following files **ARE SAFE** to commit:

- `.env.example` (contains only placeholders)
- `.gitignore` (protects sensitive files)
- `README.md` (sanitized - no real credentials)
- `TEST-REPORT.md` (sanitized - no real credentials)
- All source code files
- Configuration files (without secrets)

---

## 🔍 Verify Before Pushing

Run these commands to check what will be committed:

```bash
# Check git status
git status

# Check what files are tracked
git ls-files

# Verify .env is NOT listed (should not appear)
git ls-files | grep .env

# If .env appears, it means it's tracked - REMOVE IT!
git rm --cached .env
git rm --cached server/.env
```

---

## 🚨 If You Accidentally Committed Secrets

If you've already committed sensitive data:

### Option 1: Remove from Last Commit (if not pushed)
```bash
git rm --cached .env
git rm --cached server/.env
git commit --amend -m "Remove sensitive files"
```

### Option 2: Remove from History (if already pushed)
```bash
# Use BFG Repo-Cleaner or git filter-branch
# WARNING: This rewrites history!

# Install BFG
# Download from: https://rtyley.github.io/bfg-repo-cleaner/

# Remove .env from all commits
bfg --delete-files .env

# Clean up
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push (WARNING: Coordinate with team)
git push --force
```

### Option 3: Rotate All Secrets
If secrets were exposed:
1. **Immediately change your database password**
2. **Generate a new NEXTAUTH_SECRET**
3. **Update all .env files**
4. **Revoke any API keys that were exposed**

---

## 📝 Environment Variables Reference

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js | Generated with `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Application URL | `http://localhost:3000` |
| `NEXT_PUBLIC_API_BASE_URL` | Backend API URL | `http://localhost:3001` |
| `NODE_ENV` | Environment mode | `development` or `production` |

### Optional Variables (OAuth)

| Variable | Description |
|----------|-------------|
| `GITHUB_ID` | GitHub OAuth Client ID |
| `GITHUB_SECRET` | GitHub OAuth Client Secret |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret |

---

## 🎯 Best Practices

1. **Never commit `.env` files** - Always use `.env.example` as a template
2. **Use strong secrets** - Generate random strings for all secret keys
3. **Different secrets per environment** - Don't reuse production secrets in development
4. **Rotate secrets regularly** - Change secrets periodically
5. **Use environment-specific files** - `.env.development`, `.env.production`
6. **Document required variables** - Keep `.env.example` updated
7. **Review before committing** - Always check `git status` before pushing

---

## 🔗 Useful Resources

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Prisma Environment Variables](https://www.prisma.io/docs/guides/development-environment/environment-variables)
- [GitHub .gitignore Templates](https://github.com/github/gitignore)
- [OWASP Secrets Management](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)

---

## 📞 Need Help?

If you're unsure about any security aspect:
1. Check this guide first
2. Review the `.env.example` files
3. Consult the project documentation
4. Ask in project discussions (never share actual secrets!)

---

**Last Updated:** January 2026  
**Status:** ✅ All sensitive data protected
