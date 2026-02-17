
# Installing and Setting Up Hadoop

## Prerequisites:

1. **Java**: Hadoop requires Java 8 or higher. Install it using the following command:

```sh
brew install --cask microsoft-openjdk
```

1. **SSH**: Hadoop needs SSH for managing its nodes. Ensure SSH is installed and running:

```sh
brew install openssh-server
sudo service ssh start
```

## Step-by-Step Installation:

### 1. Download Hadoop:

- Go to the [Hadoop Apache website](https://hadoop.apache.org/releases.html) and download the latest stable release.
- Extract the downloaded file:

```sh
tar -xzvf hadoop-x.y.z.tar.gz
mv hadoop-x.y.z /usr/local/hadoop
```

### 2. Set Up Environment Variables:

- Open the `.bashrc` file:

  ```sh
  nano ~/.bashrc
  ```

- Add the following lines to set Hadoop environment variables:

  ```sh
  export HADOOP_HOME=/usr/local/hadoop
  export HADOOP_INSTALL=$HADOOP_HOME
  export HADOOP_MAPRED_HOME=$HADOOP_HOME
  export HADOOP_COMMON_HOME=$HADOOP_HOME
  export HADOOP_HDFS_HOME=$HADOOP_HOME
  export YARN_HOME=$HADOOP_HOME
  export HADOOP_COMMON_LIB_NATIVE_DIR=$HADOOP_HOME/lib/native
  export PATH=$PATH:$HADOOP_HOME/sbin:$HADOOP_HOME/bin
  ```

- Apply the changes:

  ```sh
  source ~/.bashrc
  ```

### 3. Configure Hadoop:

- Navigate to the Hadoop configuration directory:

```sh
cd $HADOOP_HOME/etc/hadoop
```

- Edit the following configuration files:

**hadoop-env.sh**:

```sh
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
```

**core-site.xml**:

```xml
<configuration>
    <property>
        <name>fs.defaultFS</name>
        <value>hdfs://localhost:9000</value>
    </property>
</configuration>
```

**hdfs-site.xml**:

```xml
<configuration>
    <property>
        <name>dfs.replication</name>
        <value>1</value>
    </property>
    <property>
        <name>dfs.name.dir</name>
        <value>file:///usr/local/hadoop/hadoop_data/hdfs/namenode</value>
    </property>
    <property>
        <name>dfs.data.dir</name>
        <value>file:///usr/local/hadoop/hadoop_data/hdfs/datanode</value>
    </property>
</configuration>
```

**mapred-site.xml**:

```xml
<configuration>
    <property>
        <name>mapreduce.framework.name</name>
        <value>yarn</value>
    </property>
</configuration>
```

**yarn-site.xml**:

```xml
<configuration>
    <property>
        <name>yarn.nodemanager.aux-services</name>
        <value>mapreduce_shuffle</value>
    </property>
</configuration>
```

### 4. Format the NameNode:

```sh
hdfs namenode -format
```

### 5. Start Hadoop:

- Start the Hadoop daemons:

```sh
start-dfs.sh
start-yarn.sh
```

- Verify the services are running:

```sh
jps
```

  You should see NameNode, DataNode, ResourceManager, and NodeManager in the list.

### 6. Access Hadoop Web Interfaces:

- **HDFS NameNode**: `http://localhost:9870`
- **YARN ResourceManager**: `http://localhost:8088`

## Summary:

1. Install prerequisites (Java, SSH).
2. Download and extract Hadoop.
3. Set up environment variables.
4. Configure Hadoop files (`core-site.xml`, `hdfs-site.xml`, `mapred-site.xml`, `yarn-site.xml`).
5. Format the NameNode.
6. Start Hadoop services.
7. Access the web interfaces to manage and monitor Hadoop.
