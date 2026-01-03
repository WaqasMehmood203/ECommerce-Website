# 🚀 Quick Reference - GitHub Push

## ⚡ Quick Commands

### Before First Push (Git Not Initialized)
```bash
git init
git add .
git commit -m "Initial commit: Electronics eCommerce Shop"
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

### Regular Push (Git Already Initialized)
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

### Verify Before Push
```powershell
# Run the verification script
.\verify-before-push.ps1

# Or manually check
git status
git ls-files | Select-String -Pattern '\.env$'  # Should return nothing
```

---

## 🔒 Protected Files (Will NOT be committed)

- `.env` - Your actual credentials
- `server/.env` - Server credentials
- `*.log` - Log files
- `test-output.txt` - Test outputs
- `node_modules/` - Dependencies
- `.next/` - Build files

---

## ✅ Safe Files (WILL be committed)

- `.env.example` - Template files
- `.gitignore` - Protection rules
- All source code
- Documentation (sanitized)
- Configuration files

---

## 🆘 Emergency: If You Committed Secrets

```bash
# Remove from last commit (not pushed yet)
git rm --cached .env server/.env
git commit --amend -m "Remove sensitive files"

# If already pushed - IMMEDIATELY:
# 1. Change your database password
# 2. Generate new NEXTAUTH_SECRET
# 3. Update .env files
# 4. Contact GitHub support to purge history
```

---

## 📋 Pre-Push Checklist

- [ ] `.env` files exist locally
- [ ] `.env.example` files exist
- [ ] No `.env` in `git status`
- [ ] Documentation has no real credentials
- [ ] Ran `.\verify-before-push.ps1`

---

## 🔗 Important Files

- `GITHUB-PUSH-READY.md` - Full guide
- `SECURITY-SETUP.md` - Security details
- `.env.example` - Environment template
- `verify-before-push.ps1` - Verification script

---

**Ready to push? Run:** `.\verify-before-push.ps1` **first!**
