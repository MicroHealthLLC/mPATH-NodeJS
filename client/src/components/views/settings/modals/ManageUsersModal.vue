<template>
    <el-dialog :visible.sync="localRoleVisible" :before-close="closeUserRoles" append-to-body center
        class="contractForm p-0 addUserRole">
        <span slot="title" class="text-left add-groups-header ">
            <h5 style="color:#383838" v-if="projectRowData">
                <i class="fas fa-clipboard-list mr-1 mb-2 mh-green-text"></i> {{ projectRowData.facilityName }}
            </h5>
        </span>
        <div class="container-fluid p-0">
            <div class="pl-3 mt-0 row"
                v-if="viableProjectUsers && viableProjectUsers.length > 0 && _isallowed('write')">
                <div class="col-5 pt-0 pl-0">
                    <label class="font-md mb-0 d-flex">Add User(s) To Project </label>
                    <el-select v-model="projectRoleUsers" filterable class="w-100" clearable multiple track-by="id"
                        value-key="id" placeholder="Search and select Project Users">
                        <el-option v-for="item in viableProjectUsers" :value="item" :key="item.id"
                            :label="item.fullName">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-5 pt-0">
                    <label class="font-md mb-0 d-flex">Select Role for User(s) </label>
                    <el-select v-model="projectRoleNames" filterable class="w-100" clearable track-by="id"
                        value-key="id" placeholder="Search and select Project Users">
                        <el-option
                            v-for="item in getRoles.filter(t => t.type_of == 'project' && t.name !== 'crud-row-project-20220407')"
                            :value="item" :key="item.id" :label="item.name">
                        </el-option>
                    </el-select>


                </div>
                <div class="col-2 pt-0 text-right">
                    <label class="font-md mb-0 d-flex" style="visibility:hidden">|</label>

                    <el-button type="default" @click="saveProjectUserRole" v-if="projectRoleNames && projectRoleUsers"
                        v-tooltip="`Save`" class="bg-primary btn-sm text-light">
                        <i class="far fa-save"></i>
                    </el-button>

                </div>

            </div>
            <div class="pl-3 mt-0 row"
                v-if="getRolesLoaded && contentLoaded && viableProjectUsers && viableProjectUsers.length <= 0">
                There are currently no program users to assign to this project. You can either add new program users
                from
                portfolio or remove desired user from current role in this project.
            </div>

            <div class="mt-4 row">
                <div class="col-12 pt-0">
                    <el-table v-loading="!getRolesLoaded" element-loading-spinner="el-icon-loading"
                        v-if="projectUsers && projectUsers.roleIds && projectUsers.roleIds.length > 0"
                        :header-cell-style="{ background: '#EDEDED' }" :data="projectUsers.roleIds" height="375"
                        width="100%">
                        <el-table-column prop="role_name" width="200" sortable filterable label="Roles">
                            <template slot-scope="scope">
                                <span
                                    v-if="projectUsers.data.map(t => t.role_id == scope.row) && scope.$index !== rowIndex_1 || scope.$index == rowIndex_1 && isEditingRoles">
                                    {{ projectUsers.data.filter(t => t.role_id == scope.row).map(t => t.role_name)[0] }}
                                </span>
                                <span v-if="changeRoleMode && scope.$index == rowIndex_1">
                                    <el-select v-if="bulkChangeProjectRoleNames.id" v-model="bulkChangeProjectRoleNames"
                                        filterable class="w-100" track-by="id" value-key="id">
                                        <el-option
                                            v-for="item in getRoles.filter(t => t.type_of == 'project' && t.name !== 'crud-row-project-20220407')"
                                            :value="item" :key="item.id" :label="item.name">
                                        </el-option>
                                    </el-select>
                                    <el-select v-if="currentRoleName && !bulkChangeProjectRoleNames.id"
                                        v-model="currentRoleName" filterable class="w-100" track-by="id" value-key="id">
                                        <el-option
                                            v-for="item in getRoles.filter(t => t.type_of == 'project' && t.name !== 'crud-row-project-20220407')"
                                            :value="item" :key="item.id" :label="item.name">
                                        </el-option>
                                    </el-select>
                                    <!-- {{ scope.row}}   -->
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column width="675" sortable filterable label="Users">
                            <template slot-scope="scope">
                                <span v-if="scope.$index !== rowIndex_1 || changeRoleMode">
                                    <span v-for="(item, i) in projectUsers.data" :key="i">
                                        <span
                                            v-if="(item.user_id && programUsers.map(t => t.id == item.user_id)) && item.role_id == scope.row && programUsers.filter(t => item.user_id == t.id).map(t => t.fullName).length > 0"
                                            class="userNames">
                                            {{ programUsers.filter(t => item.user_id == t.id).map(t =>
        t.fullName).join()
                                            }}
                                        </span>
                                    </span>

                                </span>
                                <span v-if="isEditingRoles && scope.$index == rowIndex_1">
                                    <el-select v-model="assignedProjectUsers"
                                        :disabled="assignedProjectUsers && assignedProjectUsers.length <= 0" filterable
                                        class="w-100 el-popper" :popper-append-to-body="false"
                                        popper-class="select-popper" clearable multiple track-by="id" value-key="id"
                                        placeholder="No Users Assigned to this Project">
                                        <el-option v-for="item in programUsers" :value="item" :key="item.id"
                                            :label="item.fullName">
                                        </el-option>
                                    </el-select>

                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" align="center" width="140" class="px-0"
                            v-if="(_isallowed('delete') || _isallowed('write'))">
                            <template slot-scope="scope" class="px-0">
                                <el-button type="default" size="mini" @click="bulkChangeRole(scope.$index, scope.row)"
                                    v-if="scope.$index !== rowIndex_1 && _isallowed('write')" v-tooltip="`Change Role`"
                                    class="bg-light px-2 mx-0">
                                    <i class="fa-solid fa-users-gear text-primary"></i>
                                </el-button>
                                <el-button size="mini" type="default"
                                    @click="saveBulkChangeRole(scope.$index, scope.row)" v-if="scope.$index == rowIndex_1 && changeRoleMode && (bulkChangeProjectRoleNames.id || currentRoleName.id) &&
        (scope.row !== bulkChangeProjectRoleNames.id && scope.row !== currentRoleName.id)" v-tooltip="`Save`"
                                    class="bg-primary px-2 text-light">
                                    <i class="far fa-save"></i>
                                </el-button>
                                <el-button type="default" @click="saveRemoveUsers(scope.$index, scope.row)"
                                    v-if="isEditingRoles && scope.$index == rowIndex_1" v-tooltip="`Save`" size="mini"
                                    class="bg-primary text-light px-2">
                                    <i class="far fa-save"></i>
                                </el-button>
                                <el-button type="default" size="mini"
                                    v-if="scope.$index !== rowIndex_1 && (_isallowed('delete'))"
                                    v-tooltip="`Remove all users from this role`"
                                    @click.prevent="removeAllUsers(scope.$index, scope.row)"
                                    class="bg-danger mx-0 px-2">
                                    <i class="fa-solid fa-users-slash mr-1 text-light"></i>
                                </el-button>
                                <el-button type="default" size="mini"
                                    v-if="scope.$index !== rowIndex_1 && (_isallowed('delete'))"
                                    v-tooltip="`Remove user(s) from this role`"
                                    @click.prevent="editUsers(scope.$index, scope.row)" class="bg-danger mx-0 px-2">
                                    <i class="fa-solid fa-user-slash text-light"></i>
                                </el-button>
                                <el-button type="default" size="mini"
                                    v-if="isEditingRoles && scope.$index == rowIndex_1" v-tooltip="`Cancel`"
                                    @click.prevent="cancelEditRoles(scope.$index, scope.row)"
                                    class="bg-secondary text-light px-2">
                                    <i class="fas fa-ban"></i>
                                </el-button>
                                <el-button size="mini" type="default"
                                    v-if="changeRoleMode && scope.$index == rowIndex_1" v-tooltip="`Cancel`"
                                    @click.prevent="cancelBulkChangeRole(scope.$index, scope.row)"
                                    class="bg-secondary text-light px-2">
                                    <i class="fas fa-ban"></i>
                                </el-button>

                            </template>
                        </el-table-column>

                    </el-table>
                    <span class="" v-else>
                        No Users Assigned
                    </span>

                    <div class="d-flex justify-content-end mt-3">
                        <button @click.prevent="closeUserRoles" class="btn btn-md bg-secondary text-light modalBtns"
                            v-tooltip="`Cancel`">
                            <i class="fas fa-ban"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </el-dialog>
</template>
<script>
export default {
    name: 'ManageUsersModal',
    props: ['rolesVisible', 'getRoles', 'currentRoleName', 'bulkChangeProjectRoleNames',
        'isEditingRoles', 'projectRowData', 'viableProjectUsers', 'getRolesLoaded',
        'contentLoaded', 'projectUsers', 'changeRoleMode', 'programUsers', 'assignedProjectUsers'],
    data() {
        return {
            localRoleVisible: this.rolesVisible
        }
    },
    methods: {
        closeUserRoles() {
            this.$emit('closeUserRoles');
        },
        cancelBulkChangeRole(index, rowData) {
            this.$emit('cancelBulkChangeRole', index, rowData)
        },
        saveProjectUserRole() {
            this.$emit("saveProjectUserRole")
        },
        bulkChangeRole(index, rowData) {
            this.$emit("bulkChangeRole", index, rowData)
        },
        saveRemoveUsers(index, rowData) {
            this.$emit("saveRemoveUsers", index, rowData)
        },
        saveBulkChangeRole(index, rowData) {
            this.$emit('saveBulkChangeRole', index, rowData)
        },
        removeAllUsers(index, rowData) {
            this.$emit('removeAllUsers', index, rowData)
        },
        editUsers(index, rowData) {
            this.$emit('editUsers', index, rowData)
        },
        cancelEditRoles(index, rowData) {
            this.$emit('cancelEditRoles', index, rowData)
        }
    },
    watch: {
        rolesVisible(newVal) {
            this.localRoleVisible = newVal
        }
    }
}
</script>