# Hadoop

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [License](#license)
- [What is Hadoop?](#what-is-hadoop)
- [Why Hadoop?](#why-hadoop)
  - [Hadoop's Unique Features:](#hadoops-unique-features)
  - [Summary:](#summary)
- [Hadoop Ecosystem](#hadoop-ecosystem)
  - [Core Components:](#core-components)
  - [Data Storage and Management:](#data-storage-and-management)
  - [Data Processing and Analysis:](#data-processing-and-analysis)
  - [Data Collection and Ingestion:](#data-collection-and-ingestion)
  - [Real-Time Processing:](#real-time-processing)
  - [Workflow and Resource Management:](#workflow-and-resource-management)
  - [Security and Governance:](#security-and-governance)
  - [Development and Testing:](#development-and-testing)
  - [Interactive Tools and User Interfaces:](#interactive-tools-and-user-interfaces)
  - [Miscellaneous Tools:](#miscellaneous-tools)
- [Differences Between HDFS and Other Storages:](#differences-between-hdfs-and-other-storages)
  - [HDFS (Hadoop Distributed File System):](#hdfs-hadoop-distributed-file-system)
  - [Other Storage Systems:](#other-storage-systems)
  - [Summary:](#summary-1)

<!-- /code_chunk_output -->

## License

Hadoop is licensed under the Apache License, Version 2.0. Compared to MIT License, Apache License is more restrictive. It requires you to include a copy of the license in your software, and it also requires you to state any changes you made to the software.

## What is Hadoop?

Hadoop is an open-source software framework for storing data and running applications on clusters of commodity hardware. It provides massive storage for any kind of data, enormous processing power and the ability to handle virtually limitless concurrent tasks or jobs. Although Hadoop is written in the soon-to-be-outdated language Java, it (unfortunately) remains a key player in the field of big data analysis and processing.

## Why Hadoop?

Hadoop is a powerful tool for processing and analyzing large volumes of data. It  is used to store and process large datasets in a distributed computing environment. Hadoop is designed to scale up from a single server to thousands of machines, each offering local computation and storage. It is a cost-effective solution for businesses that need to store and process large amounts of data.

### Hadoop's Unique Features:

1. **Scalability**: Hadoop easily scales by adding more computers (nodes) to the cluster, handling massive amounts of data efficiently. Traditional systems can scale too, but may require more complex setups like Kubernetes.

1. **Fault Tolerance**: If a computer (node) in the Hadoop cluster fails, the data is automatically replicated on other nodes. Traditional systems can lose data if the storage fails.

1. **Parallel Processing**: Hadoop processes data across multiple nodes simultaneously, speeding up data analysis. Traditional systems process data on fewer machines, which can be slower for large datasets.

1. **Handles Unstructured Data**: Hadoop can store and process any type of data (text, images, videos) without needing a predefined structure. Traditional databases (SQL) require structured data.

### Summary:

Hadoop is great for storing and processing huge amounts of data, handling failures automatically, scaling easily by adding more nodes, and working with any data type.

## Hadoop Ecosystem

Hadoop is not just a single tool but a collection of tools that work together to store and process large datasets. Here’s an organized overview of the Hadoop ecosystem:

### Core Components:

1. **HDFS (Hadoop Distributed File System)**: A distributed file system that stores data across multiple machines.
2. **MapReduce**: A programming model for processing large datasets in parallel.
3. **YARN (Yet Another Resource Negotiator)**: A resource management tool that schedules jobs and allocates resources in the Hadoop cluster.

### Data Storage and Management:

1. **HBase**: A NoSQL database providing real-time read/write access to large datasets.
2. **Kudu**: A columnar storage manager for Hadoop.
3. **Parquet**: A columnar storage format for Hadoop.
4. **Avro**: A data serialization system for Hadoop.
5. **Thrift**: A software framework for scalable cross-language services development.

### Data Processing and Analysis:

1. **Hive**: A data warehouse tool that provides SQL-like queries to analyze data stored in HDFS.
2. **Pig**: A high-level scripting language for processing and analyzing large datasets.
3. **Spark**: A fast and general-purpose cluster computing system for big data.
4. **Tez**: A framework for building high-performance batch and interactive data processing applications.
5. **Impala**: A massively parallel processing SQL query engine for Apache Hadoop.
6. **Flink**: A stream processing framework for distributed, high-performing, always-available, and accurate data streaming applications.
7. **Presto**: A distributed SQL query engine for big data.
8. **Tajo**: A distributed data warehouse system for big data.
9. **Mahout**: A machine learning library for building scalable machine learning algorithms.
10. **DataFu**: A collection of user-defined functions for Hadoop and Pig.

### Data Collection and Ingestion:

1. **Sqoop**: A tool for transferring data between Hadoop and relational databases.
2. **Flume**: A tool for collecting, aggregating, and moving large amounts of log data.
3. **NiFi**: A data flow automation tool for managing, processing, and distributing data.
4. **Chukwa**: A data collection system for monitoring large distributed systems.

### Real-Time Processing:

1. **Storm**: A real-time computation system for processing large streams of data.
2. **Kafka**: A distributed streaming platform for building real-time data pipelines.
3. **Pulsar**: A distributed messaging and streaming platform.

### Workflow and Resource Management:

1. **Oozie**: A workflow scheduler for managing Hadoop jobs.
2. **Ambari**: A web-based tool for provisioning, managing, and monitoring Hadoop clusters.
3. **Slider**: A framework for deploying, managing, and monitoring long-running applications on Hadoop.
4. **Twill**: A programming model for building distributed systems on Hadoop.
5. **Helix**: A cluster management framework for partitioned and replicated distributed systems.

### Security and Governance:

1. **Knox**: A gateway for securing Hadoop clusters.
2. **Ranger**: A framework for managing security policies for Hadoop components.
3. **Atlas**: A metadata management tool for Hadoop.
4. **Sentry**: A system for enforcing fine-grained access control policies for Hadoop.
5. **Kerberos**: A network authentication protocol for securing Hadoop clusters.

### Development and Testing:

1. **MRUnit**: A Java library for testing MapReduce programs.

### Interactive Tools and User Interfaces:

1. **Hue**: A web-based interface for analyzing data with Apache Hadoop.
2. **Zeppelin**: A web-based notebook that enables interactive data analytics.

### Miscellaneous Tools:

1. **Phoenix**: A SQL query engine for Apache HBase.
2. **BookKeeper**: A distributed log storage service for building reliable real-time applications.
3. **Ratis**: A Java implementation of the Raft consensus algorithm.
4. **Falcon**: A data management and processing tool for Hadoop.
5. **Hama**: A distributed computing framework for big data.
6. **Kite**: A set of libraries for building data applications on Hadoop.

## Differences Between HDFS and Other Storages:

### HDFS (Hadoop Distributed File System):

1. **Distributed Storage**:

    - **Data Distribution**: Automatically distributes data across multiple machines (nodes) for fault tolerance and scalability.
    - **Replication**: Data is replicated across multiple nodes to ensure reliability and availability.
2. **Designed for Big Data**:

    - **Handling Large Files**: Optimized for storing and processing very large files and datasets.
    - **Batch Processing**: Primarily designed for batch processing rather than real-time processing.
3. **Fault Tolerance**:

    - **Automatic Recovery**: If a node fails, HDFS can automatically recover data from replicated copies on other nodes.
4. **Write-Once-Read-Many**:

    - **Data Integrity**: Designed with a write-once-read-many pattern, meaning files are typically written once and read multiple times, ensuring data integrity.

### Other Storage Systems:

1. **Relational Databases (e.g., PostgreSQL, MySQL)**:

    - **Structured Data**: Optimized for storing structured data with defined schemas.
    - **ACID Compliance**: Ensures transactional integrity with ACID (Atomicity, Consistency, Isolation, Durability) properties.
    - **Real-Time Processing**: Designed for real-time data processing and quick query responses.
2. **NoSQL Databases (e.g., MongoDB, Cassandra)**:

    - **Flexibility**: Supports semi-structured and unstructured data.
    - **Scalability**: Scales horizontally by adding more nodes, similar to HDFS.
    - **Real-Time Queries**: Designed for real-time queries and quick data retrieval.
3. **Object Storage (e.g., Amazon S3, Google Cloud Storage)**:

    - **Scalability**: Highly scalable storage solution for both small and large data.
    - **Data Accessibility**: Provides easy access to data over the web using REST APIs.
    - **Cost-Effective**: Typically more cost-effective for storing large amounts of data compared to HDFS.
4. **Distributed File Systems (e.g., Ceph, GlusterFS)**:

    - **Flexibility**: Can store a wide range of data types, from small files to large datasets.
    - **Fault Tolerance**: Similar to HDFS, they offer fault tolerance and data replication.
    - **Use Cases**: Often used in environments requiring both large-scale data storage and real-time data access.

### Summary:

- **HDFS**: Best for distributed, fault-tolerant storage of large datasets with a focus on batch processing.
- **Relational Databases**: Ideal for structured data, transactional integrity, and real-time processing.
- **NoSQL Databases**: Flexible, scalable solutions for semi-structured and unstructured data with real-time queries.
- **Object Storage**: Scalable, cost-effective storage for diverse data types accessible via web APIs.
- **Distributed File Systems**: Versatile storage systems combining scalability, fault tolerance, and support for a wide range of data types.
