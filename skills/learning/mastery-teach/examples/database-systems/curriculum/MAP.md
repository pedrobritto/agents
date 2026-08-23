# Database Systems — learning map

Map version: **1**.

```mermaid
flowchart LR
classDef locked fill:#eee,stroke:#999,color:#777;
classDef available fill:#fff,stroke:#333,stroke-width:2px;
classDef unseen fill:#fff,stroke:#777;
classDef familiar fill:#fff,stroke:#555,stroke-width:2px;
classDef functional fill:#fff,stroke:#333,stroke-width:3px;
classDef proficient fill:#fff,stroke:#111,stroke-width:4px;
classDef mastered fill:#fff,stroke:#000,stroke-width:6px;
classDef review fill:#fff,stroke:#000,stroke-width:3px,stroke-dasharray: 5 5;
  n_db_relational_keys["Keys and entity identity [functional]"]
  class n_db_relational_keys functional;
  n_db_relational_constraints["Declarative integrity constraints [familiar]"]
  class n_db_relational_constraints familiar;
  n_db_relational_many_to_many["Many-to-many relationships [locked]"]
  class n_db_relational_many_to_many locked;
  n_db_relational_normalization["Functional dependencies and normalization [locked]"]
  class n_db_relational_normalization locked;
  n_db_sql_joins["Join reasoning [available]"]
  class n_db_sql_joins available;
  n_db_sql_aggregation["Aggregation and grouping [locked]"]
  class n_db_sql_aggregation locked;
  n_db_transactions_atomicity["Transactions and atomic state change [locked]"]
  class n_db_transactions_atomicity locked;
  n_db_transactions_isolation["Isolation anomalies and concurrency reasoning [locked]"]
  class n_db_transactions_isolation locked;
  n_db_indexes_btree["B-tree index fundamentals [locked]"]
  class n_db_indexes_btree locked;
  n_db_indexes_composite["Composite indexes [locked]"]
  class n_db_indexes_composite locked;
  n_db_indexes_query_plan["Query-plan diagnosis [locked]"]
  class n_db_indexes_query_plan locked;
  n_db_capstone_relational_design["Integrated relational database design [locked]"]
  class n_db_capstone_relational_design locked;
  n_db_relational_keys --> n_db_relational_constraints
  n_db_relational_keys --> n_db_relational_many_to_many
  n_db_relational_constraints --> n_db_relational_many_to_many
  n_db_relational_constraints --> n_db_relational_normalization
  n_db_relational_many_to_many --> n_db_relational_normalization
  n_db_relational_keys --> n_db_sql_joins
  n_db_sql_joins --> n_db_sql_aggregation
  n_db_relational_constraints --> n_db_transactions_atomicity
  n_db_transactions_atomicity --> n_db_transactions_isolation
  n_db_sql_joins --> n_db_indexes_btree
  n_db_indexes_btree --> n_db_indexes_composite
  n_db_indexes_composite --> n_db_indexes_query_plan
  n_db_relational_normalization --> n_db_capstone_relational_design
  n_db_transactions_isolation --> n_db_capstone_relational_design
  n_db_indexes_query_plan --> n_db_capstone_relational_design
```

## Status

| Competency | Importance | Depth | State | Confidence | Retention |
|---|---|---|---|---|---|
| Keys and entity identity | core | foundational | functional | moderate | fresh |
| Declarative integrity constraints | core | foundational | familiar | low | fresh |
| Many-to-many relationships | core | foundational | locked | — | — |
| Functional dependencies and normalization | core | intermediate | locked | — | — |
| Join reasoning | core | foundational | available | — | — |
| Aggregation and grouping | core | intermediate | locked | — | — |
| Transactions and atomic state change | core | foundational | locked | — | — |
| Isolation anomalies and concurrency reasoning | core | advanced | locked | — | — |
| B-tree index fundamentals | core | intermediate | locked | — | — |
| Composite indexes | core | intermediate | locked | — | — |
| Query-plan diagnosis | core | advanced | locked | — | — |
| Integrated relational database design | core | advanced | locked | — | — |

## Frontier

**Available:** Join reasoning

**Review due/uncertain:** None.
