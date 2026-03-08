# DS3100 Smart Meter — Current Transformer (CT) Wiring Guide

**Document Reference:** DS3100 Technical Manual V4R1/2022  
**Manufacturer:** Shenzhen Donsun Technology Co., Ltd.  
**Prepared by:** Codenova  
**Date:** March 5, 2026

---

## 1. Overview

The DS3100 Savi is a **Three Phase Transformer Operated Smart Meter** designed for commercial and industrial metering. It does **not** connect directly to high-current lines. Instead, three external Current Transformers (CTs) step down the line current to a safe 5A secondary level, which feeds directly into the meter's current input terminals.

This document covers:

- Equipment required
- Terminal block layout
- CT secondary wiring procedure
- Voltage supply wiring
- Polarity and safety rules
- Post-installation commissioning checks

---

## 2. Equipment Required

| Item | Quantity | Specification |
|------|----------|---------------|
| DS3100 Smart Meter | 1 | 3-Phase, 4-Wire, 230/400V |
| Current Transformers | 3 | One per phase; 5A secondary (e.g. 100/5A, 200/5A) |
| CT Pilot cables | 3 pairs | 1mm² insulated, twisted pair |
| Voltage supply cables | 4 | 10mm² (L1, L2, L3, N) |
| Insulated screwdriver | 1 | 6mm slotted |
| Insulated side cutters | 1 | — |
| Multimeter | 1 | For continuity and polarity checks |
| Cable glands | As needed | Appropriate for cable diameters |

---

## 3. Meter Terminal Block Layout

The DS3100 has a **10-terminal block** numbered 1 through 10, visible through the transparent terminal cover. The connection diagram is also **engraved on the inside of the terminal cover** as the on-site reference.

### 3-Phase 4-Wire (3P4W) Terminal Assignment

| Terminal No. | Label | Connection |
|:---:|---|---|
| **1** | L1 | Phase A — Voltage input (from supply) |
| **2** | I1-S1 | CT Phase A — Secondary IN (S1 / P1 terminal) |
| **3** | I1-S2 | CT Phase A — Secondary OUT (S2 / P2 terminal) |
| **4** | L2 | Phase B — Voltage input (from supply) |
| **5** | I2-S1 | CT Phase B — Secondary IN (S1 / P1 terminal) |
| **6** | I2-S2 | CT Phase B — Secondary OUT (S2 / P2 terminal) |
| **7** | L3 | Phase C — Voltage input (from supply) |
| **8** | I3-S1 | CT Phase C — Secondary IN (S1 / P1 terminal) |
| **9** | I3-S2 | CT Phase C — Secondary OUT (S2 / P2 terminal) |
| **10** | N | Neutral — Voltage reference and power return |

> **Note:** Each current terminal is fitted with **two screws** to ensure secure cable attachment.

---

## 4. CT Secondary Wiring Diagram (Text Representation)

```
SUPPLY BUSBARS
    |       |       |       |
   L1      L2      L3      N
    |       |       |       |
  [CT1]   [CT2]   [CT3]    |
  S1 S2  S1 S2  S1 S2      |
   |  |   |  |   |  |       |
   |  |   |  |   |  |       |
  T2  T3  T5  T6  T8  T9   T10
   |       |       |         |
  T1      T4      T7        T10
   |       |       |         |
  ====  DS3100 METER  ====
```

**How to read this:**

- L1, L2, L3 busbars connect to Terminals 1, 4, 7 (voltage sensing + meter power)
- CT1 clamps around **L1** wire; its S1→Terminal 2, S2→Terminal 3
- CT2 clamps around **L2** wire; its S1→Terminal 5, S2→Terminal 6
- CT3 clamps around **L3** wire; its S1→Terminal 8, S2→Terminal 9
- Neutral N connects to Terminal 10

---

## 5. Step-by-Step Wiring Procedure

### Step 1 — Mount the Meter

1. Mount the meter on a flat surface or meter box at **1.3–1.5m above floor level**.
2. Drill fixing holes using a 6mm masonry bit and fit wall plugs.
3. Screw the meter base to the wall — do not over-tighten.
4. Route cables up through the knock-off glands at the bottom of the terminal cover.

### Step 2 — Install the CTs on the Supply Cables

1. **De-energise** the supply before opening any panel or touching live conductors.
2. Clamp **CT1** around the **L1** (Phase A) conductor.
3. Clamp **CT2** around the **L2** (Phase B) conductor.
4. Clamp **CT3** around the **L3** (Phase C) conductor.
5. Do **NOT** clamp a CT around the Neutral conductor.
6. Orient each CT so that current flows through the primary from **P1 → P2** in the direction from source to load. This ensures correct polarity.

> **WARNING:** Never open-circuit the CT secondary terminals while the primary conductor is live. Always short S1–S2 before disconnecting secondary wires from the meter. Failure to do so will produce dangerously high voltage at the CT terminals.

### Step 3 — Wire CT Secondaries to the Meter

Using 1mm² twisted-pair pilot cable:

| CT | S1 wire → Meter Terminal | S2 wire → Meter Terminal |
|----|--------------------------|--------------------------|
| CT1 (Phase A) | Terminal **2** | Terminal **3** |
| CT2 (Phase B) | Terminal **5** | Terminal **6** |
| CT3 (Phase C) | Terminal **8** | Terminal **9** |

1. Strip cable ends to approximately 8mm.
2. Insert S1 wire firmly into the first terminal of each pair and tighten both screws.
3. Insert S2 wire into the second terminal of each pair and tighten both screws.
4. Tug each wire gently to confirm secure connection.

### Step 4 — Wire the Voltage Supply to the Meter

The meter draws its operating power from the voltage terminals:

| Cable | Meter Terminal | Specification |
|-------|---------------|---------------|
| Phase A (L1) | Terminal **1** | 10mm² |
| Phase B (L2) | Terminal **4** | 10mm² |
| Phase C (L3) | Terminal **7** | 10mm² |
| Neutral (N) | Terminal **10** | 10mm² |

1. Connect incoming Phase A live wire to Terminal 1.
2. Connect incoming Phase B live wire to Terminal 4.
3. Connect incoming Phase C live wire to Terminal 7.
4. Connect the Neutral wire to Terminal 10.
5. If outgoing load wires are present, connect outgoing L-load and N-load to the bottom set of terminals (below the horizontal partition).

> **Note:** The meter's voltage circuit draws less than **1W / 2.5VA per phase** — self-consumption is negligible.

### Step 5 — Double-Check Polarity

Before energising, verify with a multimeter:

- Continuity from each CT S1 → correct meter terminal
- Continuity from each CT S2 → correct meter terminal
- No short circuit between S1 and S2 at the meter
- Voltage cables route to correct phase terminals

---

## 6. CT Specifications Matched to DS3100

| DS3100 Meter Parameter | Required CT Spec |
|---|---|
| Basic current (In) | 5A secondary output |
| Maximum current (Imax) | 10A secondary (do not exceed) |
| Internal CT ratio | 1000:1 (inside meter) |
| Secondary sampling resistance | 15Ω |
| Recommended cable | 1mm² twisted pair pilot cable |

**Example CT ratios that produce 5A secondary:**

| Load Current | CT Ratio to Use |
|---|---|
| Up to 50A | 50/5A |
| Up to 100A | 100/5A |
| Up to 200A | 200/5A |
| Up to 400A | 400/5A |
| Up to 630A | 630/5A |

---

## 7. Power Supply to the Meter

The DS3100 is powered in two ways:

### 7.1 Primary Power — Grid Supply

- The meter is powered directly from the **voltage terminal inputs** (L1, L2, L3, N).
- Operating voltage range: **60%–140% of nominal** (138V–322V on 230V system).
- No separate auxiliary power supply is needed.
- Self-consumption: < 1W, 2.5VA per voltage circuit.

### 7.2 Backup Power — Internal Lithium Battery

- A **replaceable lithium battery** inside the meter provides backup power.
- When mains supply fails, the battery keeps the **Real Time Clock (RTC)** running and continues to log tamper events (cover opening detection).
- The battery does **not** support full metering operation during mains failure — only RTC and tamper detection.
- Battery is accessible from the front of the meter (replaceable without breaking seals in the module chamber).

---

## 8. Without a Breaker — Direct CT Installation

When installing with CTs only (no circuit breaker), the following applies:

- **CTs connect directly to the meter** current terminals — this is the standard and correct method.
- **No breaker is required** between the CT secondaries and the meter.
- The voltage supply taps (Terminals 1, 4, 7, 10) can connect directly from the main busbar or incomer terminals.
- An upstream isolator or breaker on the **voltage supply taps** is recommended as best practice for safe maintenance isolation, but it is not a requirement for the meter to function.

---

## 9. Post-Installation Commissioning

1. Close the upstream supply to apply power to the meter.
2. Confirm the **LCD display** activates and shows available credit (kWh).
3. Switch on a load at the consumer premises.
4. Check the **Active Energy Pulse LED** is flashing — confirms the meter is measuring energy.
5. Verify the meter serial number on the display matches the number printed on the meter label and supplied meter card.
6. Seal the terminal cover with utility seals.
7. Hand over the meter card and user guide to the consumer.

---

## 10. Safety Warnings Summary

| # | Warning |
|---|---------|
| 1 | Always de-energise the supply before connecting or disconnecting terminals. |
| 2 | Never open-circuit a CT secondary while the primary is live. |
| 3 | Always short CT secondary (S1–S2) before removing wires from the meter. |
| 4 | Installation must be carried out by technically qualified personnel only. |
| 5 | Meter must be pre-set (account opened) and sealed before installation. |
| 6 | Do not exceed 125% of Imax (12.5A) on any current terminal. |
| 7 | Ingress protection is IP54 — do not install in locations exceeding this exposure. |

---

## 11. Applicable Standards

| Standard | Description |
|---|---|
| IEC 62053-22 | Static meters for active energy (Class 0.5S) |
| IEC 62056-21 | Direct local data exchange |
| IEC 60529 | Degrees of protection — IP54 |
| IEC 61000-4-2 | ESD immunity |
| IEC 61000-4-5 | Surge immunity |
| IEC 60044-1 | Current Transformers |

---

*Document prepared based on DS3100 Technical Manual V4R1/2022 by Shenzhen Donsun Technology Co., Ltd.*  
*© 2026 Codenova*
