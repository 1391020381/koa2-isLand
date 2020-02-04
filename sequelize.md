# Model definition 模型定义

1.  除了 dataType 你可以在每个列上设置很多参数
    - dataType
    - allowNull:false
    - defaultValue:true
    - myDate:{type:Sequelize.DATE,defaultValue:Sequelize.NOW}
    - unique
    - fields
    - autoIncrement
    - comment   // 仅可以为 MySQL,PostgreSQL 和 MSSQL 的列添加注释
    - bar_id:{  // 外健
        type:Sequelize.INTEGER,
        references:{
            model:Bar, // 另一个模型
            key:id,
            deferrable:Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    }

 2. Getters 和 setters  
 3. 校验
    - validate

 4. 配置
    - modelName 
    - tableName  定义表的名字
    - timestamps
    - paranoid // 不删除数据库的条目,但将新添加的属性deleteAt设置为当前的日期  只有在启动时间戳才工作
    - underscored // 将自动设置所有属性的字段参数为下划线命名方式   不覆盖已有的字段


  5. 倒入 

  6. 乐观锁
  7. 数据库同步
  8. 扩展模型




  * [Incorrect datetime value](https://www.cnblogs.com/huanhang/p/7050757.html)