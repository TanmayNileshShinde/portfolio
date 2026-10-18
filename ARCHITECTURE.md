# System Architecture — Developer Portfolio

This document details the frontend component hierarchy, Framer Motion springs, and responsive asset loading pipelines.

## Architecture Overview

```text
[ Root Layout (App.jsx) ]
        |
        +---> [ Navigation Bar (Active Section Observer) ]
        |
        +---> [ Hero Terminal & Status Broadcast Engine ]
        |
        +---> [ Projects Matrix Grid (Data-driven portfolioData.js) ]
        |
        +---> [ Interactive Tech Stack Matrix & Glass Bento Cards ]
        |
        +---> [ Contact Dispatcher & Footer ]
```

### Motion Design Guidelines
1. **Spring Dynamics:** Micro-interactions use damping ratios between `20-25` and stiffness of `200-300` for physical tactile feel.
2. **Intersection Observers:** Subcomponents lazy-animate only when scrolling into viewport to eliminate GPU overdraw.
