# Set MySQL character set and collation to UTF-8 (RDS)
    These are notes for how to set UTF-8 (UTF8) collation and character set in MySQL database server. There are also notes on how to set the dfeault collation and characters set to UTF-8 on Amazon RDS MySQL database instances.

    utf8_unicode_ci vs utf8_general_ci collation

    In general, utf8_unicode_ci should always be used. It provides correct sorting in all languages. The utf8_general_ci collation takes shortcuts and does not sort exactly right in certain languages, and its only benefit is a tiny performance increase.



## Show current collation variable settings
     SHOW VARIABLES LIKE '%colla%';

## This is the output you want to see

    +----------------------+-----------------+
    | Variable_name        | Value           |
    +----------------------+-----------------+
    | collation_connection | utf8_unicode_ci |
    | collation_database   | utf8_unicode_ci |
    | collation_server     | utf8_unicode_ci |
    +----------------------+-----------------+

## Show current character set variable settings

    SHOW VARIABLES LIKE '%char%';

## This is the output you want to see
    +--------------------------+----------------------------------+
    | Variable_name            | Value                            |
    +--------------------------+----------------------------------+
    | character_set_client     | utf8                             |
    | character_set_connection | utf8                             |
    | character_set_database   | utf8                             |
    | character_set_filesystem | binary                           |
    | character_set_results    | utf8                             |
    | character_set_server     | utf8                             |
    | character_set_system     | utf8                             |
    | character_sets_dir       | /usr/local/share/mysql/charsets/ |
    +--------------------------+----------------------------------+

## Change the MySQL database collation to UTF-8
    
    ALTER DATABASE my_database DEFAULT COLLATE utf8_unicode_ci;

## Change the MySQL database character set to UTF-8
  
    ALTER DATABASE my_database DEFAULT CHARACTER SET utf8;

## These settings should be in my.cnf

    skip-character-set-client-handshake
    collation_server=utf8_unicode_ci
    collation_connection=utf8_unicode_ci
    collation_database=utf8_unicode_ci
    character_set_server=utf8
    character_set_database=utf8
    Amazon RDS Set Database Parameters

## You can create a DB PARAMETER GROUP FROM AMAZON RDS CONSOLE

## Download RDS CLI command line tools

    wget http://s3.amazonaws.com/rds-downloads/RDSCli.zip

## Unzip the tools

    unzip RDSCli.zip

## Check the version of Java (must be at least 1.6 for RDSCLI 1.12+)
     java -version

### Add the following lines to a batch file called setup-rds-environment.bat
### Double-click this batch file to open a pre-prepared command prompt
### It will show RDS status upon opening
    SET AWS_RDS_HOME="C:\RDSCli\RDSCli-1.12.001"
    SET JAVA_HOME="C:\Program Files\Java\jre6"
    SET AWS_CREDENTIAL_FILE="C:\RDSCli\aws-credential-file.txt"
    CD C:\RDSCli\RDSCli-1.12.001\bin
    CMD /K "rds-describe-db-instances"


## Check if rds tools are working
   
    rds --help

## Show current status of database instances (rebooting, active, etc.)

    rds-describe-db-instances

## Use the following to specify the 
##  --I ACCESSKEY --S "SECRETKEY"

    rds-modify-db-parameter-group "my-database-param-group" --parameters "name=max_allowed_packet, value=67108864, method=immediate"

## must be 'pending-reboot'
    rds-modify-db-parameter-group "my-database-param-group" --parameters "name=innodb_buffer_pool_size, value=268435456, method=pending-reboot"

## Does not work
## rds-modify-db-parameter-group "my-database-param-group" --parameters "name=innodb_log_file_size, value=67108864, method=pending-reboot"


    rds-modify-db-parameter-group "my-database-param-group" --parameters "name=character_set_server, value=utf8, method=immediate"

    rds-modify-db-parameter-group "my-database-param-group" --parameters "name=collation_server, value=utf8_unicode_ci, method=immediate"

    rds-modify-db-parameter-group "my-database-param-group" --parameters "name=character_set_database, value=utf8, method=immediate"

    rds-modify-db-parameter-group "my-database-param-group" --parameters "name=collation_connection, value=utf8_unicode_ci, method=immediate"

### Note, collation_database is not a valid setting

### You can assigin DB PARAMETER GROUP FROM AMAZON RDS CONSOLE

### Reboot the MySQL database
### Reboot is also possible from the Amazon RDS Console
rds-reboot-db-instance "my-database-param-groups"

------------------------------------------------------------

## the following parameter must be 'pending-reboot'
    rds-modify-db-parameter-group "my-database-param-group" --parameters "name=innodb_buffer_pool_size, value=134217728, method=pending-reboot"
    rds-modify-db-parameter-group "my-database-param-group" --parameters "name=myisam_sort_buffer_size, value=1048576, method=immediate"
    rds-modify-db-parameter-group "my-database-param-group" --parameters "name=key_buffer_size, value=8388608, method=immediate"
    rds-modify-db-parameter-group "my-database-param-group" --parameters "name=max_connections, value=24, method=immediate"



    DEFAULTS-except max_allowed_packet-----------------------------------------------------------
## must be 'pending-reboot'
    rds-modify-db-parameter-group "my-database-param-group" --parameters "name=innodb_buffer_pool_size, value=402653184, method=pending-reboot"
    rds-modify-db-parameter-group "my-database-param-group" --parameters "name=myisam_sort_buffer_size, value=8388608, method=immediate"
    rds-modify-db-parameter-group "my-database-param-group" --parameters "name=key_buffer_size, value=16777216, method=immediate"
    rds-modify-db-parameter-group "my-database-param-group" --parameters "name=max_connections, value=48, method=immediate"


    Altering MySQL database, table, and column collations to utf8_unicode_ci


## Show database collations
    select * from information_schema.schemata;

## Alter database collations
    ALTER DATABASE dbname DEFAULT COLLATE utf8_unicode_ci;

## Show tables using utf8_general_ci
    select distinct table_schema, table_name, table_collation from information_schema.tables where table_collation = 'utf8_general_ci' and table_type != 'SYSTEM VIEW' AND table_schema != 'mysql';

## Alter table collation (note, this does not change the data in the columns. 
##     you must convert the data using the command below)
    ALTER TABLE dbname.tablename COLLATE utf8_unicode_ci;

## Show columns
    select table_schema, table_name, column_name, collation_name, character_set_name
    from information_schema.columns 
    where table_schema not in ('information_schema','mysql','tmp') 
    and collation_name is not null and character_set_name is not null 
    and collation_name='utf8_general_ci';

### Alter the data of all columns in a table
### When converting UTF-8 data stored as latin1, this command will NOT convert that to UTF-8
###  For example, a 3-byte UTF-8 character stored as 3 latin1 characters will not be converted
###   to a single UTF-8 character.  It will be converted to 3 separate UTF-8 characters 
###  representing each latin1 (gibberish) characters. You'll need to reload the data into the table.
    ALTER TABLE tbl_name CONVERT TO CHARACTER SET utf8 COLLATE utf8_unicode_ci;
