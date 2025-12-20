# Simple But Useful PostgreSQL Queries

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=true} -->

<!-- code_chunk_output -->

1. [Retrieve Current Date and Time](#retrieve-current-date-and-time)
2. [List All Tables in the Current Database](#list-all-tables-in-the-current-database)
3. [Get Column Names of a Table](#get-column-names-of-a-table)
4. [Find Maximum/Minumum Value in a Column](#find-maximumminumum-value-in-a-column)
5. [Find Invoice Numbers Containing Letters](#find-invoice-numbers-containing-letters)
6. [Find Invoice Numbers Not Matching a Specific Pattern](#find-invoice-numbers-not-matching-a-specific-pattern)
7. [Find Companies Not Located in Europe (German)](#find-companies-not-located-in-europe-german)

<!-- /code_chunk_output -->

## Retrieve Current Date and Time

```sql
SELECT NOW() AS current_datetime;
-- 2025-12-20 14:56:52.187793+00
```

## List All Tables in the Current Database

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public';
```

## Get Column Names of a Table

```sql
SELECT column_name
FROM information_schema.columns
WHERE table_name = 'rechnung';
```

## Find Maximum/Minumum Value in a Column

```sql
-- MAX or MIN
SELECT MAX(your_column_name) AS max_value
FROM your_table_name;
```

## Find Invoice Numbers Containing Letters

```sql
SELECT DISTINCT rechnung_no
FROM rechnung
WHERE rechnung_no ~ '[a-zA-Z]';
```

## Find Invoice Numbers Not Matching a Specific Pattern

```sql
WHERE rechnung_no !~ '^[0-9/\-]+$'
```

## Find Companies Not Located in Europe (German)

```sql
SELECT u.*, a.*
FROM unternehmen u
INNER JOIN adresse a ON u.id = a.unternehmen_id
WHERE a.land NOT IN (
    'Albanien',
    'Andorra',
    'Belgien',
    'Bosnien und Herzegowina',
    'Bulgarien',
    'Dänemark',
    'Deutschland',
    'Estland',
    'Finnland',
    'Frankreich',
    'Griechenland',
    'Irland',
    'Island',
    'Italien',
    'Kosovo',
    'Kroatien',
    'Lettland',
    'Liechtenstein',
    'Litauen',
    'Luxemburg',
    'Malta',
    'Moldau',
    'Monaco',
    'Montenegro',
    'Niederlande',
    'Nordmazedonien',
    'Norwegen',
    'Österreich',
    'Polen',
    'Portugal',
    'Rumänien',
    'Russland',
    'San Marino',
    'Schweden',
    'Schweiz',
    'Serbien',
    'Slowakei',
    'Slowenien',
    'Spanien',
    'Tschechien',
    'Türkei',
    'Ukraine',
    'Ungarn',
    'Vatikanstadt',
    'Vereinigtes Königreich',
    'Weißrussland',
    'Zypern',
    'Zypern Nord',
    'Zypern Süd'
)
ORDER BY a.land;
```
