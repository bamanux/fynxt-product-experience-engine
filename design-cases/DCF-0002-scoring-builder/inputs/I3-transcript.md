# I3 transcript — `I3-scoring-builder.xlsx` (sheet "Scoring")

Cell values and formulas read directly from the workbook XML on 2026-10-13 (SHA-256
`d249aca91d6318fa17778bdb85060d946f3a325292a21ba36808c224729f240b`). The PDF I2
(`08d7df8b…c3c5dd`) is a print of this sheet; the workbook is cited because it shows the formulas.

## Case 1 — Client risk score (A1:I29)

- B1: "This case is calculate the Client risk score"
- Pre-request (B2): C3 "Applicable User Type = Contact"; C4 "Applicable Contact Category = Retail & Professional"; C5 "Applicable Profile = Trader"
- C10: "Selected Object is Contact"

| Attribute (C) | Score Weightage (D) | Score Category (E) | Data (F) | Risk Score (G) | Client1 (H) | Client2 (I) |
|---|---|---|---|---|---|---|
| Country | 0.4 | Low | India, China | 10 | `=G13*D13` → 4 | |
| | | Medium | USA, UK | 40 | | |
| | | High | Pakistan, Japan | 90 | | `=G15*D13` → 36 |
| Occupation | 0.2 | Low | Salaried | 10 | `=G16*D16` → 2 | |
| | | Medium | Self Employee | 50 | | `=G17*D16` → 10 |
| | | High | Student | 90 | | |
| Industry | 0.2 | Low | Manufacturing | 10 | | `=G19*D19` → 2 |
| | | Medium | Technology | 50 | | |
| | | High | Infra Structure | 90 | `=G21*D19` → 18 | |
| Income | 0.2 | Low | 0 to 10K | 10 | | `=G22*D22` → 2 |
| | | Medium | 10 to 20K | 20 | `=G23*D22` → 4 | |
| | | High | 20K and above | 70 | | |
| *Risk Calculation* (E25) | | | | | `=SUM(H13:H24)` → **28** | `=SUM(I13:I24)` → **50** |
| | | | | | Low Risk | Medium Risk |

Total Score bands (C27:E29): **0 to 30 → Low Risk**, **31 to 70 → Medium Risk**, **71 to 100 → High Risk**.

## Case 2 — Deal score (A31:I59)

- B31: "This case is to calculate the deal score"
- Pre-request (B33): C34 "Applicable all active Deals"
- C39: "Selected Object is Deal"

| Attribute | Weightage | Category | Data | Risk Score | Deal1 | Deal2 |
|---|---|---|---|---|---|---|
| Deal Stage | 0.25 | Low | 0 to 2 stages | 10 | `=G42*D42` → 2.5 | |
| | | Medium | 2 to 4 stages | 50 | | `=G43*D42` → 12.5 |
| | | High | 4th stage and above | 90 | | |
| Engagement/Activity | 0.25 | Low | Low | 10 | | `=G45*D45` → 2.5 |
| | | Medium | Medium | 50 | | |
| | | High | High | 90 | `=G47*D45` → 22.5 | |
| Decision Authority | 0.25 | Low | User | 10 | | `=G48*D48` → 2.5 |
| | | Medium | Evaluator | 20 | `=G49*D48` → 5 | |
| | | High | Decision Maker | 70 | | |
| Deal Value | 0.25 | Low | 0 to 10K | 10 | `=D51*G51` → 2.5 | |
| | | Medium | 10 to 20K | 20 | | `=D51*G52` → 5 |
| | | High | 20K and above | 70 | | |
| *Deal Score Calculation* (E54) | | | | | `=SUM(H42:H53)` → **32.5** | `=SUM(I42:I53)` → **22.5** |
| | | | | | Warm Deal | Cold Deal |

Total Score bands (C57:E59): **0 to 30 → Cold Deal**, **31 to 70 → Warm Deal**, **71 to 100 → Hot Deal**.

## Formula as implemented in the workbook

`contribution(attribute) = matched value's score × attribute weight` (weight as a fraction, e.g. 0.4 = 40%);
`total = Σ contributions` over all attributes; the total is placed in a band. Each weight set sums to 1.0 (100%).
