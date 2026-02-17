# PostgreSQL Style Guide

## General Guidelines

- **Clarity and Descriptiveness**: Names should be clear and descriptive.
- **Consistency**: Be consistent in naming conventions across the database.
- **Avoid Reserved Words**: Avoid using PostgreSQL reserved words for names.

## Database and Table Names

- **Lowercase**: Use lowercase since PostgreSQL automatically converts names to lowercase.
- **Underscores for Separation**: Use underscores (`_`) to separate words, e.g., `customer_addresses`.
- **Singular Names**: Prefer singular over plural names, e.g., `order` instead of `orders`.

## Column Names

- **Descriptive**: Column names should be descriptive and clear.
- **Lowercase with Underscores**: Use lowercase with underscores for separation.
- **Prefix Foreign Keys**: Prefix foreign keys with the name of the reference table, e.g., `user_id`.

## SQL Queries

- **Capitalization**: Use uppercase for SQL keywords, e.g., `SELECT`, `FROM`, `WHERE`.
- **Indentation**: Use indentation for readability, especially in complex queries.
- **Qualify Columns**: Qualify column names with table names or aliases in joins.

## Indexes

- **Naming Convention**: Name indexes as `idx_<table>_<column>`, e.g., `idx_users_username`.

## Functions and Stored Procedures

- **Descriptive Names**: Use descriptive names, indicating purpose.
- **Parameter Naming**: Parameters should have clear, descriptive names.

## Views

- **Naming**: Prefix views with `vw_` to distinguish from tables, e.g., `vw_active_users`.

## General Practices

- **Comments**: Use comments to explain complex logic or important details.
- **Avoid SELECT ***: Specify columns instead of using `SELECT *`.
- **Data Types**: Choose appropriate data types for columns.
