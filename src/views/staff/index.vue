<template>
  <div class="app-container">
    <el-button type="primary" round>新增美容技师</el-button>
    <el-table :data="StaffList">
      <el-table-column fixed prop="date" align="center" label="序列号" width="150">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column fixed prop="date" label="日期" width="150">
        <template slot-scope="scope">
          {{ scope.row.date }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column prop="province" label="省份" width="120">
        <template slot-scope="scope">
          {{ scope.row.province }}
        </template></el-table-column>
      <el-table-column prop="city" label="市区" width="120">
        <template slot-scope="scope">
          {{ scope.row.city }}
        </template></el-table-column>
      <el-table-column prop="address" label="地址" width="300">
        <template slot-scope="scope">
          {{ scope.row.address }}
        </template></el-table-column>
      <el-table-column prop="zip" label="邮编" width="120">
        <template slot-scope="scope">
          {{ scope.row.zip }}
        </template></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getStaffs, addStaff, deleteStaff, updateStaff } from '@/api/staff'

const defaultStaff = {
  key: '',
  name: '',
  description: '',
  routes: []
}

export default {
  data() {
    return {
      StaffList: []
    }
  },
  created() {
    this.getStaffs()
  },
  methods: {
    async getStaffs() {
      const res = await getStaffs()
      this.StaffList = res.data
    },
    async handleAddRole() {
      this.role = Object.assign({}, defaultStaff)
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
    },
    handleDelete({ $index, row }) {
      this.$confirm('Confirm to remove the role?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(async() => {
          await deleteStaff(row.key)
          this.$message({
            type: 'success',
            message: 'Delete succed!'
          })
        })
        .catch(err => { console.error(err) })
    },
    async confirmRole() {
      const isEdit = this.dialogType === 'edit'

      if (isEdit) {
        await updateStaff(this.role.key, this.role)
      } else {
        const { data } = await addStaff(this.role)
        this.role.key = data.key
        this.rolesList.push(this.role)
      }

      const { description, key, name } = this.role
      this.dialogVisible = false
      this.$notify({
        title: 'Success',
        dangerouslyUseHTMLString: true,
        message: `
            <div>Role Key: ${key}</div>
            <div>Role Name: ${name}</div>
            <div>Description: ${description}</div>
          `,
        type: 'success'
      })
    }
  }
}
</script>
