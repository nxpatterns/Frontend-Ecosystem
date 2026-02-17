
# Apache Spark

## What is Spark?
Apache Spark is an open-source, distributed computing system that provides an interface for programming entire clusters with implicit data parallelism and fault tolerance.

## License:

- **Apache License 2.0**
- **Open Source**: Yes

## Usage with Hadoop:

- **Standalone**: Spark can be used independently of Hadoop.
- **With Hadoop**: Spark can be integrated with Hadoop for enhanced functionality, utilizing HDFS for storage and YARN for resource management.

## Key Considerations When Using Spark with Hadoop:

1. **Resource Management**: Ensure that YARN is properly configured to manage resources between Hadoop and Spark efficiently.
2. **Data Storage**: Utilize HDFS for storing data that Spark processes to leverage Hadoop's distributed storage capabilities.
3. **Compatibility**: Ensure compatibility between the versions of Hadoop and Spark being used.

## PySpark:

- **PySpark** is the Python API for Apache Spark. It allows you to write Spark applications using Python, making it accessible for Python developers.
- **Features**: Includes support for Spark's core functionalities like Spark SQL, DataFrame API, and more.

## Installation Guide:

### Prerequisites:

1. **Java**: Ensure Java 8 or higher is installed.

   ```sh
   sudo apt-get install openjdk-8-jdk
   ```

2. **Python**: Python 2.7 or 3.4+ (for PySpark).

   ```sh
   sudo apt-get install python3
   ```

### Step-by-Step Installation:

1. **Download Spark**:
   - Go to the [Spark Apache website](https://spark.apache.org/downloads.html) and download the latest version.
   - Extract the downloaded file:

     ```sh
     tar -xzvf spark-x.y.z-bin-hadoopX.x.tgz
     mv spark-x.y.z-bin-hadoopX.x /usr/local/spark
     ```

2. **Set Up Environment Variables**:
   - Open the `.bashrc` file:

     ```sh
     nano ~/.bashrc
     ```

   - Add the following lines to set Spark environment variables:

     ```sh
     export SPARK_HOME=/usr/local/spark
     export PATH=$PATH:$SPARK_HOME/bin:$SPARK_HOME/sbin
     ```

   - Apply the changes:

     ```sh
     source ~/.bashrc
     ```

3. **Configure Spark (Optional)**:
   - Navigate to the Spark configuration directory:

     ```sh
     cd $SPARK_HOME/conf
     ```

   - Copy the template configuration file:

     ```sh
     cp spark-env.sh.template spark-env.sh
     cp spark-defaults.conf.template spark-defaults.conf
     ```

   - Edit `spark-env.sh` and `spark-defaults.conf` as needed.

4. **Start Spark**:
   - Start the Spark shell to verify the installation:

     ```sh
     spark-shell
     ```

### Using PySpark:

1. **Start PySpark**:

   ```sh
   pyspark
   ```

2. **Write and Run a PySpark Application**:

   ```python
   from pyspark.sql import SparkSession

   spark = SparkSession.builder.appName("example").getOrCreate()
   data = [(1, "foo"), (2, "bar"), (3, "baz")]
   df = spark.createDataFrame(data, ["id", "value"])
   df.show()
   ```

## Summary:

- Apache Spark is a powerful, open-source distributed computing system.
- Licensed under Apache License 2.0.
- Can be used standalone or with Hadoop.
- PySpark enables Spark usage with Python.
- Installation involves setting up Java, downloading Spark, setting environment variables, and starting Spark.
