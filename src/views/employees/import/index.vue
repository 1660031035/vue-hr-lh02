<template>
  <upload-excel
    :on-success="handleSuccess"
    :before-upload="beforeUpload"
  />
</template>

<script>
import { formatExcelDate } from '@/utils/index'
import { importEmployee } from '@/api/employees'
export default {
  name: 'Import',
  data() {
    return {
      tableData: [],
      tableHeader: []
    }
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1
      if (isLt1M) {
        return true
      }
      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    // 导入excel
    async doImport(data) {
      try {
        await importEmployee(data)
        // 导入成功提示
        // 成功之后回退
        this.$router.back()
      } catch (error) {
        console.log(error)
      }
    },
    // 封装一个函数处理excel
    // 将一个对象数组中的每个对象的属性名,从中文改成英文
    transExcel(results, header) {
      console.log('转换之前的数据', results, header)
      const mapInfo = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName',
        '聘用形式': 'formOfEmployment'
      }
      // 处理数据
      // 字段全是中文的，后端要求是英文的
      // 1.找到所有的中文的key
      const zhKeys = Object.keys(results[0])
      console.log(zhKeys)
      // results是从excel读入的内容
      return results.map(item => {
        // 创建一个新对象：它的key是英文的，value是item的值是一致的
        const obj = {}
        zhKeys.forEach(zhkey => {
          const enKey = mapInfo[zhkey]
          // 如果是日期，要做额外的转换
          if (enKey === 'timeOfEntry' || enKey === 'correctionTime') {
            obj[enKey] = new Date(formatExcelDate(item[zhkey]))
          } else {
            obj[enKey] = item[zhkey]
          }
        })
        return obj
      })
    },
    // 成功读出excel文件的内容
    async handleSuccess({ header, results }) {
      // console.log(header, results, '表格内容')
      this.tableData = results
      this.tableHeader = header
      const newData = this.transExcel(results, header)
      // console.log(newData, '转换之后')
      this.doImport(newData)
    }
  }
}
</script>
