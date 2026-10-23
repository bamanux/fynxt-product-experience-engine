# I12 — "Scoring Builder.pdf" (one map), Aman Bansal (Product Designer), with `/fdi-revise` 2026-10-21

**Request (verbatim):** "i am attaching the one map can we make it a version and lets save the current version and make the new one with this most of the things remains same"

The PDF was attached in chat (1 page, a spreadsheet-style mock). The original file was not saved to disk by FDI
(chat attachment only): **drop the PDF into this folder as `I12-scoring-builder-one-map.pdf`** so the source is kept.
Below is the text of the page as extracted, laid out by region, verbatim.

## Top: model
- Scoring Name: `Contact Risk Score` · Descrption: `Risk Scoring`

## Score Settings (Low / High columns)
| Band | Low | High |
|---|---|---|
| Low | 0 | 55 |
| Medium | 56 | 65 |
| High | 66 | (blank) |
| Restricted | (blank) | (blank) |

## Objects
- Add Object: `Contact` … `Lead` (two object boxes side by side)
- Under them: a filter toolbar image (filter icon, chips "First Name", "Last Name", "Email Id", "Clear all") and a "Clear All" link
- A row: `AND` · `+ Add Rule` · `+Add Group`

## Attribute table (Column · Weightage (%) · Category · Value · Score)
| Column | Weightage (%) | Category | Value | Score |
|---|---|---|---|---|
| Country | NA | Low | Australia, Bhutan, Chile | 20 |
| | | Medium | Argentina, Brazil, China | 30 |
| | | High | Egypt, Morocco, Uganda | 40 |
| | | Restricted | Afghanistan, Iraq, Nepal | Reject |
| Industry+Occupation | NA | Low | Casinos-Others | 10 |
| | | Medium | Casinos-Partner | 15 |
| | | High | Casinos-Owner | 20 |
| Source of Fund | NA | Low | Self-employment | 10 |
| | | Medium | Day trading | 15 |
| | | High | Family Incode | 20 |
| Product | NA | Low | Margin Trading | 5 |
| | | Low | Deliverable FX | 5 |

## Override (toggle shown ON)
| Field | Category | | Condition | | Result |
|---|---|---|---|---|---|
| Country | High | Score | Regardless | Override | High |
| Country | Restricted | Score | Regardless | Override | Restricted |
| Country | Medium | Score | Lower | Override | Medium |

A text list also appears: "Product NA · Country NA · Industry+Occupation NA · Source of Fund NA".

## Right side: worked example (two people, "Aman" in blue and "Gaja" in orange)
| Column | Weight | Category | Score | Aman | Gaja |
|---|---|---|---|---|---|
| country | 50% | Low (Aman) | 10 | 5 | |
| | | Medium (Gaja) | 15 | | 7.5 |
| | | High | 20 | | |
| Industry | 25% | Low (Gaja) | 10 | | 2.5 |
| | | Medium (Aman) | 15 | 3.75 | |
| | | High | 20 | | |
| Fund | 25% | Low+Low (both) | 10 | 2.5 | 2.5 |
| | | Medium | 15 | | |
| | | High | 20 | | |

FDI arithmetic check: each figure = category score × weight (10 × 50% = 5; 15 × 50% = 7.5; 10 × 25% = 2.5; 15 × 25% = 3.75).
Totals (not on the page): Aman 5 + 3.75 + 2.5 = **11.25**; Gaja 7.5 + 2.5 + 2.5 = **12.5**. The example's scores (10 / 15 / 20)
differ from the table's (Country 20 / 30 / 40) — the example is illustrative (C23).
