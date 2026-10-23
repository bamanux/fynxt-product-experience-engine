# I10 transcript: "Customer Risk Assessment Scoring – Individual Clients (Onboarding v2.2)"

Source: `I10-customer-risk-assessment-individual.pdf` (6 pages, LMAX Global letterhead), SHA-256
`8e459129737e6e573867dec658ef51757a4f04bffdbfae7af6752099a8c75006`. Supplied by Aman Bansal (Product Designer) with
`/fdi-revise` on 2026-10-15 as "the additional requirement example for logics". Revision table (p6): author Enayet Nayeem,
v1 (Oct 2018) to v2.2 (Apr 2026, "HNWI changed from 3 mln EUR to 3 mln USD").

The values below are the client's **sample configuration**. They show which logic the builder must be able to express; they are not FYNXT product rules (as with I2 / I3).

## p1–2: Category scores

| Category | Values → category · points |
|---|---|
| Country Risk | Low 20 · Medium 30 · High 40 · **Restricted → REJECT** |
| Industry Risk (**matrix**: industry × role) | Columns *Self employed (Owner)* / *Director / Partner* / *Other*. Most industries are Low 10 in every column. "High-risk" industries (Art Dealer / Antique / Auction Houses; Casinos / betting / gambling; Defence / Military; Export / Import; Government / Public Sector; Money Service Business; Pharmaceuticals; Precious Metals / stones; Property / Construction / Trade) are **High 20 / Medium 15 / Low 10** by role |
| Source of Funds | Employment / self-employment Low 10 · Day trading Medium 15 · Family or partner income High 20 · Inheritance Medium 15 · Pension Low 10 · Property income Medium 15 · **Other → "Case by case"** |
| Product Risk | Margin Trading Low 5 · Deliverable FX Low 5 (no Medium / High values listed) |
| Delivery Channel | Face to Face Low 5 · Non face to face – through IB Medium 7.5 · Non face to face (no IB) High 10 |

## p3: Overview, overrides, final bands

Overview: Country 20 / 30 / 40; Industry 10 / 15 / 20; Source of Funds 10 / 15 / 20; Product 5 / 7.5 / 10; Delivery 5 / 7.5 / 10 (maximum total = 100).

Specific overrides:

| Category | Specifics | Guidance | Override |
|---|---|---|---|
| Country of residence | Rated as high risk | Override to high risk regardless of risk score | High risk |
| Country of residence | Rated as restricted | Reject regardless of risk score | Reject |
| Country of residence | Rated as medium risk | Override to medium risk **if risk score is LOWER than country risk** | Medium |
| PEP | Customer is a PEP, or family member / close associate of a PEP | Override to high risk regardless of risk score | High risk |
| Source of funds | Disclosed as third-party funds | Account to be rejected | Reject |
| Adverse media | Positive compliance hit | Escalate to compliance | Case by case |
| Nationality | From a *Restricted Jurisdiction* | Override to high risk regardless of risk score | High risk |
| Sanctioned entity | Client is on sanctions list | Rejected **and** escalated to compliance | Reject |
| HNWI | Annual income above 3 mln USD **or** savings above 3 mln USD | Override to high risk regardless of risk score | High risk |

Final risk score: **55 or less → LOW**; **over 55 but ≤ 65 → MEDIUM**; **over 65 → HIGH**.

## p4–5: Worked examples (FDI arithmetic check)

| # | Case | Parts as printed | Printed total | Sum of parts | Printed result | Check |
|---|---|---|---|---|---|---|
| 1 | UK, self-employed precious metals, SOF employment, non-F2F | 20 + 20 + 10 + 5 + 10 | 65 | 65 | MEDIUM | ✓ |
| 2 | Same, with IB | 20 + 20 + 10 + 5 + 7.5 | 62.5 | 62.5 | MEDIUM | ✓ |
| 3 | China, director manufacturing, through IB | 30 + 10 + 10 + 5 + 7.5 | 62.5 | 62.5 | MEDIUM | ✓ |
| 4 | China, director FX company, through IB | 30 + 10 + 10 + 5 + **10 (Medium)** | 65 | 65 | MEDIUM | ⚠ through IB is Medium = **7.5** on p2, not 10 (total would be 62.5, still MEDIUM) |
| 5 | China, director pharmaceutical, no IB | 30 + 15 + 10 + 5 + 10 | 70 | 70 | HIGH | ✓ |
| 6 | China, self-employed pharmaceutical, no IB | 30 + 20 + 10 + 5 + 10 | 75 | 75 | HIGH | ✓ |
| 7 | China, administrator (Other) pharmaceutical, no IB | 30 + 10 + 10 + 5 + 10 | 65 | 65 | MEDIUM | ✓ |
| 8 | French, unemployed, SOF inheritance, non-F2F | 20 + 10 (*"when unemployed / retired / student score is low by default"*) + 15 + 5 + 10 | **65** | **60** | Medium | ⚠ parts sum to 60 (result still MEDIUM) |
| 9 | UK, director tourism, employment, face to face, family member is a PEP | 20 + 10 + 10 + 5 + 5 | 50 | 50 | **HIGH** (override: PEP) | ✓ override applied |

Examples 3–7 have a Medium-risk country and no override applied ("No"), which is consistent with the medium-country rule (it only applies when the score is lower than the country's risk).
