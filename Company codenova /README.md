# CodeNova Innovations Ltd. — Company Structure & HR Documentation

This folder contains **CodeNova's company structure documents, employment documentation, and HR administration materials**. All documents are specific to CodeNova's organizational setup, team structure, and Nigerian compliance requirements.

**Company:** CodeNova Innovations Ltd.  
**Established:** 2026  
**Location:** Nigeria  
**Team Size:** 4 core staff  

---

## Folder Structure

### **Root Documents** (Company-wide)
- **TEAM-MEMBERS.md** — Current team roster with roles, names, and contact information
- **ORG-CHART.mmd** — Organization chart (Mermaid diagram) with reporting structure
- **README.md** — This file; overview of company documentation structure

### **Role-Based Subfolders**
Each role has a dedicated subfolder containing role-specific documents:

- **`ceo/`**
  - `JOB-DESCRIPTION.md` — Chief Executive Officer role & responsibilities
  - `OFFER-LETTER-SADIQ-YUSUF.md` — Employment offer for Sadiq Yusuf (CEO)

- **`hr-manager/`**
  - `JOB-DESCRIPTION.md` — Human Resources & Compliance Manager role
  - `OFFER-LETTER-SAFIYA-AMINU.md` — Employment offer for Safiya Aminu (HR Manager)

- **`operations-lead/`**
  - `JOB-DESCRIPTION.md` — Operations & Strategy Lead role
  - `OFFER-LETTER-HASSAN-BWALA.md` — Employment offer for Hassan Bwala (Operations Lead)

- **`admin-officer/`**
  - `JOB-DESCRIPTION.md` — Administrative & Support Services Officer role
  - `OFFER-LETTER-ABDULHAMEED-YUSUF.md` — Employment offer for Abdulhameed Yusuf (Admin Officer)

### **Salary & Payroll Administration**
- **`salary-admin/`**
  - `SALARY-STRUCTURE-CODENOVA.md` — CodeNova's definitive salary structure with:
    - Role-based gross salaries
    - Nigerian statutory deductions (PAYE, pension, NHIS)
    - Per-employee breakdown with calculations
    - Annual payroll projections
    - Compliance requirements & regulatory notes

### **Generic Templates & References**
*Removed — Use existing role subfolders as templates for new hires*

---

## Key Documents

### For Company Representation & Contract Submissions
1. [COMPANY-PROFILE-BRIEF.md](COMPANY-PROFILE-BRIEF.md) — One-page executive summary (RFPs, quick submissions)
2. [COMPANY-PROFILE-DETAILED.md](COMPANY-PROFILE-DETAILED.md) — Comprehensive 17-section profile (tenders, partnerships, detailed proposals)
3. [PROPOSAL-TEMPLATE.md](PROPOSAL-TEMPLATE.md) — Reusable template for creating client proposals

### For Hiring & Recruitment
1. Review [TEAM-MEMBERS.md](TEAM-MEMBERS.md) for current team
2. Use role-specific job descriptions in `ceo/`, `hr-manager/`, etc.
3. Use offer letters as templates for new hires (update names, dates, salary)

### For Payroll & Compliance
1. Reference [salary-admin/SALARY-STRUCTURE-CODENOVA.md](salary-admin/SALARY-STRUCTURE-CODENOVA.md)
2. Contains all Nigerian tax, pension, and NHIS calculation details
3. Updated for FY2026; review annually
4. HR Manager (Safiya Aminu) is responsible for payroll compliance

### For Onboarding New Hires
1. Use `ONBOARDING-CHECKLIST-CODENOVA.md` (customized for CodeNova)
2. Covers pre-start, Day 1, first week, probation, and confirmation
3. Includes responsibility assignments (HR, Manager, CEO)
4. References TEAM-MEMBERS.md for key contacts

### For Organization & Management
1. Review [ORG-CHART.mmd](ORG-CHART.mmd) for reporting structure
2. Mermaid diagram; can be exported to SVG/PNG via:
   ```bash
   npx @mermaid-js/mermaid-cli -i codenova/ORG-CHART.mmd -o org-chart.svg
   ```

---

## How to Use

### Adding a New Hire
1. Create a subfolder under `codenova/` with the role slug (e.g., `finance-officer/`)
2. Copy offer letter and job description from similar role; update details:
   - Employee name, email, phone
   - Salary (reference salary-admin folder for total cost)
   - Start date, reporting line
3. Update TEAM-MEMBERS.md with new hire
4. Update ORG-CHART.mmd to reflect new reporting structure
5. Coordinate with HR Manager for PFA, PAYE, and NHIS registration

### Updating Salary Information
1. **Never edit individual offer letters directly** for salary changes
2. Update `salary-admin/SALARY-STRUCTURE-CODENOVA.md` as single source of truth
3. Generate new offer letters from updated structure
4. Issue adjustment letters to affected employees
5. Update PAYE filings with FIRS (via HR Manager)

### Creating Documents for a New Role
1. Copy an existing role subfolder (e.g., `admin-officer/` → `finance-officer/`)
2. Update to the new role's specifics:
   - Job title and responsibilities (edit `JOB-DESCRIPTION.md`)
   - Employee name, salary, reporting line (edit `OFFER-LETTER-*.md`)
3. Reference `salary-admin/SALARY-STRUCTURE-CODENOVA.md` for salary & cost calculations
4. Have CEO and HR Manager review & approve
5. Store in the new role subfolder

---

## Current Team Structure

| Role | Name | Reporting To | Salary |
|------|------|--------------|--------|
| Chief Executive Officer (CEO) | Sadiq Yusuf | Board/Shareholder | ₦60,000/month |
| Human Resources & Compliance Manager | Safiya Aminu | CEO | ₦50,000/month |
| Operations & Strategy Lead | Hassan Bwala | CEO | ₦50,000/month |
| Administrative & Support Services Officer | Abdulhameed Yusuf | Operations Lead | ₦35,000/month |

---

## Compliance Notes

### Nigerian Employment Law
- All employment contracts include:
  - **Probation Period:** 3 months (either party can terminate with 1 week notice)
  - **Pension:** 18% total (10% employer + 8% employee to PFA)
  - **PAYE:** Filed monthly with FIRS before 21st of following month
  - **NHIS:** National Health Insurance Scheme (employer-sponsored)
  - **Leave:** 20 days annual leave per employee per year
  - **Gratuity:** 2 weeks per year of service (minimum 5 years)

### Regulatory Responsibilities
- **HR Manager (Safiya Aminu)**
  - Monthly PAYE filing with FIRS
  - Monthly pension remittance to PFAs
  - Maintain employee records (6-year retention minimum)
  - Coordinate NHIS enrollment
  
- **CEO (Sadiq Yusuf)**
  - Approve payroll and salary structure changes
  - Oversee compliance calendar and deadlines
  - Final approval for employment contracts & disciplinary actions

---

## Document Maintenance

**Last Updated:** 28 February 2026  
**Next Review:** August 2026  
**Maintained By:** Safiya Aminu (HR Manager)  

**Change Log:**
- **28 Feb 2026:** Created company profile documents (brief & detailed) and proposal template for contract submissions; moved all company structure docs to codenova/ folder; organized role-based documents into subfolders; created CodeNova-specific salary structure and onboarding checklist

---

## Quick Links

- [Company Profile (Brief)](COMPANY-PROFILE-BRIEF.md)
- [Company Profile (Detailed)](COMPANY-PROFILE-DETAILED.md)
- [Proposal Template](PROPOSAL-TEMPLATE.md)
- [Team Members](TEAM-MEMBERS.md)
- [Organization Chart](ORG-CHART.mmd)
- [Salary Structure](salary-admin/SALARY-STRUCTURE-CODENOVA.md)
- [Onboarding Checklist](ONBOARDING-CHECKLIST-CODENOVA.md)
- [CEO Job Description](ceo/JOB-DESCRIPTION.md)
- [HR Manager Job Description](hr-manager/JOB-DESCRIPTION.md)
- [Operations Lead Job Description](operations-lead/JOB-DESCRIPTION.md)
- [Admin Officer Job Description](admin-officer/JOB-DESCRIPTION.md)


## Render Org Chart

You can render `ORG-CHART.mmd` to SVG/PNG using `mermaid-cli` (mmdc).

Install globally:

```sh
npm install -g @mermaid-js/mermaid-cli
```

Or use `npx` without global install.

Quick render (script included):

```sh
./scripts/render-org-chart.sh
# or: npx @mermaid-js/mermaid-cli -i codenova/ORG-CHART.mmd -o codenova/.artifacts/org-chart.svg
```

Outputs will be written to `codenova/.artifacts/`.
