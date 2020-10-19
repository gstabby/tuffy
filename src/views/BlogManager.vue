<template>
  <div class="manager">
    <v-app>
      <v-snackbar
        v-model="snackbar"
        centered
      >
        {{ tip }}

        <template v-slot:action="{ attrs }">
          <v-btn
            color="pink"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
      <!-- <v-banner two-line v-if="!permission">
        <v-avatar
          slot="icon"
          color="deep-purple accent-4"
          size="40"
        >
          <v-icon
            icon="mdi-lock"
            color="white"
          >
            mdi-lock
          </v-icon>
        </v-avatar>

        抱歉您没有权限进入该系统

        <template v-slot:actions>
          <v-btn text color="deep-purple accent-4" @click="toHome">点击返回</v-btn>
        </template>
      </v-banner> -->
      <v-card color="basil" v-if="permission">
        <v-card-title class="text-center justify-center py-6">
          <h1 class="basil--text"><span @click="toBlog">TUFFY小站</span>的管理系统</h1>
        </v-card-title>

        <v-tabs
          v-model="tab"
          background-color="transparent"
          color="basil"
          grow
        >
          <v-tab>
            <v-icon>{{ mdiUser }}</v-icon>
          </v-tab>
          <v-tab>
            <v-icon>{{ mdiBlog }}</v-icon>
          </v-tab>
          <v-tab>
            <v-icon>{{ mdiType }}</v-icon>
          </v-tab>
          <v-tab>
            <v-icon>{{ mdiTag }}</v-icon>
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item
          >
            <v-card
              flat
            >
              <v-data-table
                :headers="userTable.headers"
                :items="userTable.desserts"
                class="elevation-1"
                :loading="loadingUser"
              >
                <template v-slot:[`item.role.roleDesc`]="{ item }">
                  <v-chip :color="getColorUser(item.role.roleDesc)" dark>{{ item.role.roleDesc }}</v-chip>
                </template>
                <template v-slot:[`item.user.avatar`]="{ item }">
                  <v-img
                    :src="getImg(item.user.avatar)"
                    aspect-ratio="1"
                    class="lighten-2"
                    width="40"
                    height="40"
                  />
                </template>
              </v-data-table>
            </v-card>
          </v-tab-item>
          <v-tab-item
          >
            <v-card
              flat
            >
              <v-data-table
                :headers="blogTable.headers"
                :items="blogTable.desserts"
                class="elevation-1"
                :loading="loadingBlog"
              >
                <template v-slot:[`item.readNum`]="{ item }">
                  <v-chip :color="getColorBlog(item.readNum)" outlined dark>{{ item.readNum }}</v-chip>
                </template>
                <template v-slot:[`item.tags`]="{ item }">
                  <v-chip color="orange" outlined dark>{{ item.tags }}</v-chip>
                </template>
                <template v-slot:[`item.category.title`]="{ item }">
                  <v-chip color="blue" outlined dark>{{ item.category.title }}</v-chip>
                </template>
                <template v-slot:top>
                  <v-toolbar flat color="white">
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialogBlog" max-width="500px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="primary"
                          dark
                          class="mb-2"
                          v-bind="attrs"
                          v-on="on"
                        >新增博客</v-btn>
                      </template>
                      <v-card>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12">
                                <v-text-field v-model="blogObject.title" label="博客标题" required></v-text-field>
                              </v-col>
                              <v-col cols="12">
                                <v-text-field v-model="blogObject.description" label="博客摘要" required></v-text-field>
                              </v-col>
                              <v-col cols="12">
                                <v-textarea v-model="blogObject.content" label="博客内容（markdown）" required></v-textarea>
                              </v-col>
                              <v-col cols="12">
                                <v-file-input
                                  v-model="blogObject.file"
                                  placeholder="上传封面图片"
                                  label="文件上传"
                                  required
                                  prepend-icon="mdi-paperclip"
                                >
                                  <template v-slot:selection="{ text }">
                                    <v-chip
                                      small
                                      label
                                      color="primary"
                                    >
                                      {{ text }}
                                    </v-chip>
                                  </template>
                                </v-file-input>
                              </v-col>
                              <v-col cols="12">
                                <v-select
                                  v-model="blogObject.category"
                                  :items="categoryTable.desserts"
                                  item-text="title"
                                  item-value="id"
                                  label="分类"
                                  required
                                ></v-select>
                              </v-col>
                              <v-col cols="12">
                                <v-autocomplete
                                  v-model="blogObject.tags"
                                  :items="tagTable.desserts"
                                  item-text="name"
                                  item-value="id"
                                  label="标签"
                                  multiple
                                ></v-autocomplete>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                          <v-btn color="blue darken-1" text @click="saveBlog">Save</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-toolbar>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon
                    small
                    @click="deleteBlogDialog(item)"
                  >
                    mdi-delete
                  </v-icon>
                </template>
              </v-data-table>
            </v-card>
          </v-tab-item>
          <v-tab-item
          >
            <v-card
              flat
            >
              <v-data-table
                :headers="categoryTable.headers"
                :items="categoryTable.desserts"
                class="elevation-1"
                :loading="loadingCategory"
              >
                <template v-slot:top>
                  <v-toolbar flat color="white">
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialogCategory" max-width="500px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="primary"
                          dark
                          class="mb-2"
                          v-bind="attrs"
                          v-on="on"
                        >新增分类</v-btn>
                      </template>
                      <v-card>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12">
                                <v-text-field v-model="categoryObject.title" label="分类名" required></v-text-field>
                              </v-col>
                              <v-col cols="12">
                                <v-text-field v-model="categoryObject.description" label="分类简介" required></v-text-field>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                          <v-btn color="blue darken-1" text @click="saveCategory">Save</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-toolbar>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon
                    small
                    class="mr-2"
                    @click="editCategoryDialog(item)"
                  >
                    mdi-pencil
                  </v-icon>
                  <v-icon
                    small
                    @click="deleteCategoryDialog(item)"
                  >
                    mdi-delete
                  </v-icon>
                </template>
              </v-data-table>
            </v-card>
          </v-tab-item>
          <v-tab-item
          >
            <v-card
              flat
            >
              <v-data-table
                :headers="tagTable.headers"
                :items="tagTable.desserts"
                class="elevation-1"
                :loading="loadingTag"
              >
                <template v-slot:top>
                  <v-toolbar flat color="white">
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialogTag" max-width="500px">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="primary"
                          dark
                          class="mb-2"
                          v-bind="attrs"
                          v-on="on"
                        >新增标签</v-btn>
                      </template>
                      <v-card>
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12">
                                <v-text-field v-model="tagObject.name" label="标签名" required></v-text-field>
                              </v-col>
                              <v-col cols="12">
                                <v-text-field v-model="tagObject.description" label="标签描述" required></v-text-field>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                          <v-btn color="blue darken-1" text @click="saveTag">Save</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-toolbar>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon
                    small
                    class="mr-2"
                    @click="editTagDialog(item)"
                  >
                    mdi-pencil
                  </v-icon>
                  <v-icon
                    small
                    @click="deleteTagDialog(item)"
                  >
                    mdi-delete
                  </v-icon>
                </template>
              </v-data-table>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-app>
  </div>
</template>

<script>
import {
  mdiAccountOutline,
  mdiPaperclip,
  mdiTagMultipleOutline,
  mdiGamepadSquareOutline,
  mdiBookOutline
} from '@mdi/js'
import api from '../common/js/api'
export default {
  data () {
    return {
      tab: null,
      dialogBlog: false,
      dialogCategory: false,
      dialogTag: false,
      mdiUser: mdiAccountOutline,
      mdiBlog: mdiBookOutline,
      mdiGame: mdiGamepadSquareOutline,
      mdiTag: mdiTagMultipleOutline,
      mdiType: mdiPaperclip,
      permission: false, // 权限控制
      tip: '', // 提示信息
      snackbar: false,
      loadingUser: true,
      loadingBlog: true,
      loadingCategory: true,
      loadingTag: true,
      // loadingUser: true,
      userTable: { // 用户表格
        headers: [
          {
            text: 'ID',
            align: 'start',
            sortable: false,
            value: 'user.id'
          },
          { text: '头像', value: 'user.avatar' },
          { text: '账户', value: 'user.username' },
          { text: '邮箱', value: 'user.email' },
          { text: '角色 (管理员)', value: 'role.roleDesc' },
          { text: '注册日期', value: 'user.created' }
        ],
        desserts: []
      },
      blogTable: { // 博客表格
        headers: [
          {
            text: 'ID',
            align: 'start',
            sortable: false,
            value: 'id',
            width: '2%'
          },
          { text: '标题', value: 'title', width: '8%' },
          { text: '摘要', value: 'description', width: '45%' },
          { text: '类别', value: 'category.title', width: '5%' },
          { text: '标签', value: 'tags', width: '7%' },
          { text: '阅读量', value: 'readNum', width: '9%' },
          { text: '创作日期', value: 'created', width: '9%' },
          { text: '操作', value: 'actions', sortable: false, width: '5%' }
        ],
        desserts: []
      },
      blogObject: { // 博客对象
        category: '',
        content: '',
        description: '',
        file: null,
        tags: [],
        title: ''
      },
      commentArr: [], // 评论数组
      categoryTable: { // 分类表格
        headers: [
          {
            text: 'ID',
            align: 'start',
            sortable: false,
            value: 'id'
          },
          { text: '分类名', value: 'title' },
          { text: '分类描述', value: 'description' },
          { text: '该分类下的博客数', value: 'blogNum' },
          { text: '操作', value: 'actions', sortable: false }
        ],
        desserts: []
      },
      categoryObject: { // 分类对象
        title: '',
        description: ''
      },
      tagTable: { // 标签表格
        headers: [
          {
            text: 'ID',
            align: 'start',
            sortable: false,
            value: 'id'
          },
          { text: '标签名', value: 'name' },
          { text: '标签描述', value: 'description' },
          { text: '该标签下的博客数', value: 'blogNum' },
          { text: '操作', value: 'actions', sortable: false }
        ],
        desserts: []
      },
      tagObject: { // 标签对象
        name: '',
        description: ''
      }
    }
  },
  mounted () {
    // function objectToString (obj) {
    //   return obj.name
    // }
    // if (!localStorage.getItem('token') || localStorage.getItem('userID') !== '1') {
    //   this.permission = false
    // }
    this.getUser()
    this.getBlog()
    this.getType()
    this.getTag()
  },
  methods: {
    toHome () {
      this.$router.push({
        path: '/'
      })
    },
    toBlog () {
      this.$router.push({
        path: '/blog'
      })
    },
    getUser () {
      this.axios.get(api.GETALLUSERS)
        .then(res => {
          this.permission = true
          this.userTable.desserts = res.data.data
          this.loadingUser = false
        })
        .catch(error => {
          if (error) {
            this.$router.push({
              path: '/404'
            })
          }
        })
    },
    getBlog () {
      this.loadingBlog = true
      this.axios.get(api.GETALLBLOG)
        .then(res => {
          this.blogTable.desserts = res.data.data
          for (const i in this.blogTable.desserts) {
            let nameAdd = ''
            for (const j in this.blogTable.desserts[i].tags) {
              nameAdd += this.blogTable.desserts[i].tags[j].name + ' '
            }
            this.blogTable.desserts[i].tags = nameAdd
          }
          this.loadingBlog = false
        })
        .catch(error => {
          if (error) {
            this.permission = false
          }
        })
    },
    getType () {
      this.loadingCategory = true
      this.axios.get(api.GETTYPE)
        .then(res => {
          this.categoryTable.desserts = res.data.data
          this.loadingCategory = false
        })
        .catch(error => {
          if (error) {
            this.permission = false
          }
        })
    },
    getTag () {
      this.loadingTag = true
      this.axios.get(api.GETTAGS)
        .then(res => {
          this.tagTable.desserts = res.data.data
          this.loadingTag = false
        })
        .catch(error => {
          if (error) {
            this.permission = false
          }
        })
    },
    getColorUser (role) {
      if (role === '站长') return 'red'
      else return 'green'
    },
    getColorBlog (readNum) {
      if (readNum >= 1000) return 'red'
      else if (readNum >= 500) return 'orange'
      else return 'green'
    },
    getImg (ava) {
      return api.ip + '/avatar/' + ava
    },
    editBlogDialog (item) { // 提交博客弹窗
      const tempObj = JSON.parse(JSON.stringify(item))
      this.blogObject = tempObj
      this.dialogBlog = true
    },
    deleteBlogDialog (item) { // 删除博客弹窗
      confirm('你确定要删除该博客吗?') && this.deleteBlog(item.id)
    },
    editBlog () { // 修改博客
    },
    deleteBlog (id) { // 删除博客
      this.axios.post(api.DELBLOG, this.qs.stringify({
        id: id
      })).then(res => {
        this.tip = res.data.msg
        this.getBlog()
        this.getType()
        this.getTag()
        this.snackbar = true
      }).catch(error => {
        if (error) {
          console.log(error)
        }
      })
    },
    saveBlog () { // 提交博客
      const formData = new FormData()
      let isUpload = true // 是否能上传
      for (const key in this.blogObject) {
        formData.append(key, this.blogObject[key])
      }
      for (const key in this.blogObject) {
        if (this.blogObject[key].length === 0) {
          isUpload = false
        }
      }
      if (isUpload) {
        this.axios.post(api.ADDBLOG, formData)
          .then(res => {
            if (res) {
              if (res.data.code === 200) {
                this.tip = '上传成功'
              } else {
                this.tip = res.data.msg
              }
              this.getBlog()
              this.getType()
              this.getTag()
              this.snackbar = true
              this.close()
            }
          })
          .catch(error => {
            if (error) {
              this.close()
              this.tip = '操作失败'
              this.snackbar = true
            }
          })
      } else {
        this.dialogBlog = false
        this.tip = '请不要填写空数据'
        this.snackbar = true
      }
    },
    editCategoryDialog (item) { // 提交分类弹窗
      const tempObj = JSON.parse(JSON.stringify(item))
      this.categoryObject = tempObj
      this.dialogCategory = true
    },
    deleteCategoryDialog (item) { // 删除分类弹窗
      confirm('你确定要删除该分类吗?') && this.deleteCategory(item.id)
    },
    editCategory () { // 修改分类
    },
    deleteCategory (id) { // 删除分类
      this.axios.post(api.DELTYPE, this.qs.stringify({
        id: id
      })).then(res => {
        if (res) {
          if (res.data.code === 200) {
            this.tip = '删除成功'
          } else {
            this.tip = res.data.msg
          }
          this.getType()
          this.snackbar = true
        }
      })
        .catch(error => {
          if (error) {
            this.tip = '操作失败'
            this.snackbar = true
          }
        })
    },
    saveCategory () { // 提交分类
      const formData = new FormData()
      let isUpload = true // 是否能上传
      for (const key in this.categoryObject) {
        formData.append(key, this.categoryObject[key])
      }
      for (const key in this.categoryObject) {
        if (this.categoryObject[key].length === 0) {
          isUpload = false
        }
      }
      if (isUpload) {
        this.axios.post(api.ADDTYPE, formData)
          .then(res => {
            if (res) {
              if (res.data.code === 200) {
                this.tip = '上传成功'
              } else {
                this.tip = res.data.msg
              }
              this.getType()
              this.getBlog()
              this.getTag()
              this.snackbar = true
              this.close()
            }
          })
          .catch(error => {
            if (error) {
              this.close()
              this.tip = '操作失败'
              this.snackbar = true
            }
          })
      } else {
        this.dialogCategory = false
        this.tip = '请不要填写空数据'
        this.snackbar = true
      }
    },
    editTagDialog (item) { // 提交标签弹窗
      const tempObj = JSON.parse(JSON.stringify(item))
      this.tagObject = tempObj
      this.dialogTag = true
    },
    deleteTagDialog (item) { // 删除标签弹窗
      confirm('你确定要删除该标签吗?') && this.deleteTag(item.id)
    },
    editTag () { // 修改标签
    },
    deleteTag (id) { // 删除标签
      this.axios.post(api.DELTAG, this.qs.stringify({
        id: id
      })).then(res => {
        if (res) {
          if (res.data.code === 200) {
            this.tip = '删除成功'
          } else {
            this.tip = res.data.msg
          }
          this.getTag()
          this.getBlog()
          this.getType()
          this.snackbar = true
        }
      })
        .catch(error => {
          if (error) {
            this.tip = '操作失败'
            this.snackbar = true
          }
        })
    },
    saveTag () { // 提交标签
      const formData = new FormData()
      let isUpload = true // 是否能上传
      for (const key in this.tagObject) {
        formData.append(key, this.tagObject[key])
      }
      for (const key in this.tagObject) {
        if (this.tagObject[key].length === 0) {
          isUpload = false
        }
      }
      if (isUpload) {
        this.axios.post(api.ADDTAG, formData)
          .then(res => {
            if (res) {
              if (res.data.code === 200) {
                this.tip = '上传成功'
              } else {
                this.tip = res.data.msg
              }
              this.getTag()
              this.getBlog()
              this.getType()
              this.snackbar = true
              this.close()
            }
          })
          .catch(error => {
            if (error) {
              this.close()
              this.tip = '操作失败'
              this.snackbar = true
            }
          })
      } else {
        this.dialogTag = false
        this.tip = '请不要填写空数据'
        this.snackbar = true
      }
    },
    close () { // 关闭弹窗
      this.blogObject = {
        category: '',
        content: '',
        description: '',
        file: null,
        tags: [],
        title: ''
      }
      this.categoryObject = {
        title: '',
        description: ''
      }
      this.tagObject = {
        name: '',
        description: ''
      }
      this.dialogBlog = false
      this.dialogCategory = false
      this.dialogTag = false
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  }
}
</script>

<style scoped>
.v-data-table {
  min-height: calc(100vh - 158px);
}
.basil {
  background-color: #FFFBE6 !important;
}
.basil--text {
  font-size: 45px;
  color: #333333 !important;
}
@media (max-width: 1200px) {
  .basil--text {
    font-size: 40px;
  }
}
@media (max-width: 768px) {
  .basil--text {
    font-size: 35px;
  }
}
@media (max-width: 576px) {
  .basil--text {
    font-size: 30px;
  }
}
</style>
