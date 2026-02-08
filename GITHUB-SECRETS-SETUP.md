# GitHub Secrets Setup for CodeNova Deployment

## Required Secrets

You need to add **3 secrets** to your GitHub repository for automatic deployment.

### 🔗 Add Secrets Here:
https://github.com/donzeg/codenova-web/settings/secrets/actions

---

## 1️⃣ TS_OAUTH_CLIENT_ID

**What it is:** Tailscale OAuth Client ID for GitHub Actions  
**Where to get it:** You already have this from PEMACS setup

**Steps:**
1. Go to: https://login.tailscale.com/admin/settings/oauth
2. Find your existing OAuth client (used for PEMACS)
3. Copy the **Client ID** (starts with `kc...`)
4. In GitHub:
   - Click "New repository secret"
   - Name: `TS_OAUTH_CLIENT_ID`
   - Value: Paste the Client ID

---

## 2️⃣ TS_OAUTH_SECRET

**What it is:** Tailscale OAuth Secret for GitHub Actions  
**Where to get it:** Same place as Client ID

**Steps:**
1. Same OAuth client from step 1 above
2. Copy the **Secret** (starts with `tskey-client-...`)
3. In GitHub:
   - Click "New repository secret"
   - Name: `TS_OAUTH_SECRET`
   - Value: Paste the Secret

**⚠️ Important:** If you don't have the secret saved, you'll need to regenerate the OAuth client.

---

## 3️⃣ SSH_PRIVATE_KEY

**What it is:** Your SSH private key for authenticating to the production server  
**Where to get it:** From your development server

**Steps:**

### Option A: Use Existing Key (Recommended)

You're already using this key for PEMACS, so just copy it:

```bash
# On dev server (.101)
cat ~/.ssh/id_rsa
```

**Output will look like:**
```
-----BEGIN OPENSSH PRIVATE KEY-----
b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABlwAAAAdzc2gtcn
... (many lines of random characters) ...
-----END OPENSSH PRIVATE KEY-----
```

**Copy the ENTIRE output** including the BEGIN and END lines.

In GitHub:
- Click "New repository secret"
- Name: `SSH_PRIVATE_KEY`
- Value: Paste the entire key

### Option B: Verify Your Public Key is Authorized

To check if your key is already authorized on production:

```bash
# SSH into production via Tailscale
ssh sadiq@100.94.190.92

# Check authorized keys
cat ~/.ssh/authorized_keys
```

If your public key is there, you're good! If not:

```bash
# On dev server (.101), get your public key
cat ~/.ssh/id_rsa.pub

# On production server (.102), add it
ssh sadiq@100.94.190.92
echo "YOUR_PUBLIC_KEY_HERE" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

---

## ✅ Verification Checklist

After adding all 3 secrets, verify:

- [ ] `TS_OAUTH_CLIENT_ID` - Added to GitHub
- [ ] `TS_OAUTH_SECRET` - Added to GitHub
- [ ] `SSH_PRIVATE_KEY` - Added to GitHub (full private key with BEGIN/END lines)
- [ ] Public key is in `~/.ssh/authorized_keys` on production server
- [ ] You can SSH to production: `ssh sadiq@100.94.190.92`

---

## 🚀 Test the Deployment

Once all secrets are added:

1. Make a small change to any file
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Test deployment"
   git push origin main
   ```
3. Watch the deployment: https://github.com/donzeg/codenova-web/actions
4. If it fails, check the logs for which secret is missing

---

## 🔍 Troubleshooting

### "Error: Tailscale authentication failed"
- ✅ Check `TS_OAUTH_CLIENT_ID` and `TS_OAUTH_SECRET` are correct
- ✅ Verify OAuth client exists: https://login.tailscale.com/admin/settings/oauth

### "Permission denied (publickey)"
- ✅ Check `SSH_PRIVATE_KEY` includes BEGIN/END lines
- ✅ Verify public key is in `~/.ssh/authorized_keys` on production
- ✅ Test SSH manually: `ssh sadiq@100.94.190.92`

### "ssh-keyscan: command not found"
- This is normal in GitHub Actions, the workflow handles it

---

## 📝 Notes

- **Security**: These secrets are encrypted and only accessible to GitHub Actions
- **Reuse**: You're using the same Tailscale OAuth and SSH key as PEMACS
- **Updates**: If you regenerate keys, update the secrets in GitHub
- **Access**: Only repository admins can view/edit secrets

---

## 🎯 Next Steps

After adding secrets:
1. ✅ Follow the main deployment guide: [PRODUCTION-DEPLOYMENT.md](./PRODUCTION-DEPLOYMENT.md)
2. ✅ Set up DNS: Point codenova.cc → 217.117.2.102
3. ✅ Configure Nginx on production server
4. ✅ Push code to trigger first deployment
