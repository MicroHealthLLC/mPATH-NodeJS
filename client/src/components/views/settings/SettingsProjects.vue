<template>
  <div class="row">
    <div class="col-md-2">
      <SettingsSidebar />
    </div>
    <div class="col-md-10">
      <div class="right-panel">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="mt-3 mb-4">
          <el-breadcrumb-item :to="backToSettings">
            <span style="cursor:pointer"><i class="far fa-cog mr-1"></i> PROGRAM SETTINGS
            </span>
          </el-breadcrumb-item>
          <h4 class="mt-4 ml-3">
            <i class="fas fa-clipboard-list mr-1 mh-green-text"></i> PROJECTS
            <span v-if="projectData && projectData.length" class="ml-2 pb-1 badge badge-secondary badge-pill pill">{{
            projectData.length }}
            </span>
            <span v-else class="ml-2 pb-1 badge badge-secondary badge-pill pill">{{ 0 }}
            </span>
          </h4>
        </el-breadcrumb>

        <div class="my-1 pb-2 buttonWrapper container-fluid">
          <div class="row px-0">
            <div class="col">
              <el-button @click.prevent="addProject" v-if="_isallowed('write')" class="bg-primary text-light mb-2">
                <i class="far fa-plus-circle mr-1"></i> Create Project
              </el-button>
              <el-button @click.prevent="openProjectGroup" v-if="_isallowed('write')"
                class="bg-success text-light mb-2">
                <i class="far fa-plus-circle mr-1"></i> Add Portfolio Project(s)
              </el-button>
            </div>

            <div class="col">
              <el-input type="search" placeholder="Search Projects" aria-label="Search" aria-describedby="search-addon"
                v-model="search" data-cy="">
                <el-button slot="prepend" icon="el-icon-search"></el-button>
              </el-input>
            </div>

            <div class="col pl-0">
              <el-select class="w-100 mx-2" v-model="C_groupFilter" track-by="id" value-key="id" multiple filterable
                clearable name="Project Group" placeholder="Filter Projects By Group">
                <el-option v-for="item in groupList" :key="item.id" :label="item.name" :value="item">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
        <div v-loading="!contentLoaded" element-loading-text="Fetching your data. Please wait..."
          element-loading-spinner="el-icon-loading" v-if="_isallowed('read')" class="">
          <el-table :key="componentKey" v-if="projectData && projectData.length > 0" :load="log(projectData)" :data="projectData
            .filter(
              (data) =>
                !search ||
                data.facilityName.toLowerCase().includes(search.toLowerCase())
            )
            .reverse()
            " style="width: 100%" height="450" highlight-current-row :row-key="row => row.id"
            :expand-row-keys="expandRowKeys" @expand-change="handleExpandChange"
            :default-sort="{ prop: 'facilityName', order: 'ascending' }">
            <el-table-column prop="facilityName" sortable label="Project">
              <template slot-scope="scope">
                <el-input size="small" v-if="rowId == scope.row.id" style="text-align:center"
                  v-model="scope.row.facilityName" controls-position="right"></el-input>
                <span v-else>
                  <span v-if="scope.row.isPortfolio" v-tooltip="`Portfolio Project`"><i
                      class="fas fa-circle mr-2 text-success fs-50"></i></span>
                  {{ scope.row.facilityName }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="facilityGroupName" sortable filterable label="Group">
              <template slot-scope="scope">
                <el-select v-model="scope.row.facilityGroupId" class="w-100" v-if="rowId == scope.row.id" filterable
                  track-by="id" clearable value-key="id" placeholder="Search and select Group">
                  <el-option v-for="item in facilityGroups" :value="item.id" :key="item.id" :label="item.name">
                  </el-option>
                </el-select>

                <span v-else>
                  {{ scope.row.facilityGroupName }}
                </span>
                <!-- <el-input
                size="small"
                style="text-align:center"
                v-model="scope.row.facilityGroupName"
              ></el-input> -->
              </template>
            </el-table-column>
            <el-table-column label="Actions" align="right">
              <template slot-scope="scope">
                <el-button type="default" @click="saveEdits(scope.$index, scope.row)" v-if="scope.$index == rowIndex"
                  v-tooltip="`Save`" size="small" class="bg-primary btn-sm text-light px-2">
                  <i class="fas fa-save"></i>
                </el-button>
                <el-button type="default" v-tooltip="`Cancel Edit`" v-if="scope.$index == rowIndex"
                  @click.prevent="cancelEdits(scope.$index, scope.row)" size="small"
                  class="bg-secondary btn-sm text-light px-2">
                  <i class="fas fa-ban"></i>
                </el-button>
                <el-button type="default" size="small" v-tooltip="`Edit Project`"
                  @click.prevent="editMode(scope.$index, scope.row)"
                  v-if="scope.$index !== rowIndex && !scope.row.isPortfolio && _isallowed('write')"
                  class="bg-light btn-sm px-2">
                  <i class="fas fa-edit text-primary"></i>
                </el-button>
                <el-button type="default" size="small" class="bg-light btn-sm px-2"
                  v-tooltip="'Remove Portfolio Project'" @click.prevent="removeProject(scope.$index, scope.row)" v-if="scope.$index !== rowIndex &&
            scope.row.isPortfolio && _isallowed('delete')
            ">
                  <i class="fa fa-minus-circle text-danger"></i>
                </el-button>
                <el-button type="default" size="small" v-tooltip="'Delete Program Project'"
                  @click.prevent="deleteProject(scope.$index, scope.row)" v-if="_isallowed('delete') &&
            scope.$index !== rowIndex &&
            !scope.row.isPortfolio
            " class="bg-light btn-sm px-2">
                  <i class="far fa-trash-alt text-danger "></i>
                </el-button>
                <el-button type="default" size="small" v-tooltip="`Manage User(s)`"
                  @click.prevent="addUserRole(scope.$index, scope.row)" v-if="scope.$index !== rowIndex"
                  class="bg-primary text-light btn-sm px-2">
                  <i class="fas fa-users"></i>
                </el-button>
                <el-button size="small" type="default" v-tooltip="`Go to Project`"
                  @click.prevent="goToProject(scope.$index, scope.row)" class="bg-success text-light btn-sm px-2"
                  v-if="_isallowedProject(scope.row.facilityProjectId, 'read')">
                  <i class="fas fa-arrow-alt-circle-right"></i>
                </el-button>

                <!-- <el-button type="primary" @click="handleEditRow(scope.$index)">Edit</el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div v-else class="text-danger mx-2 mt-5">
          <h5> <i>Sorry, you don't have read-permissions for this page! Please contact your Program Administrator for
              access.</i></h5>
        </div>
        <SettingsProjectModal :dialogVisible="dialogVisible" :C_projectGroupFilter="C_projectGroupFilter"
          :newProjectNameText="newProjectNameText" :groupList="groupList" :hideSaveBtn="hideSaveBtn"
          @saveNewProject="saveNewProject" @cancelCreateGroup="cancelCreateGroup"
          @setProjectNameText="setProjectNameText">
        </SettingsProjectModal>
        <PortfolioProjectsModal :dialog2Visible="dialog2Visible" :searchProjects="searchProjects"
          :programProjects="programProjects" :isIndeterminate="isIndeterminate"
          :checkedPortfolioProjects="checkedPortfolioProjects" @importProjectName="importProjectName"
          @setSearchProject="setSearchProject" @closeImportProjectBtn="closeImportProjectBtn"
          @checkAllChange="checkAllChange">
        </PortfolioProjectsModal>
        <ManageUsersModal :rolesVisible="rolesVisible" :projectRowData="projectRowData" :projectUsers="projectUsers"
          :viableProjectUsers="viableProjectUsers" :getRolesLoaded="getRolesLoaded" :contentLoaded="contentLoaded"
          :isEditingRoles="isEditingRoles" :currentRoleName="currentRoleName"
          :bulkChangeProjectRoleNames="bulkChangeProjectRoleNames" :changeRoleMode="changeRoleMode" :getRoles="getRoles"
          :programUsers="programUsers" :assignedProjectUsers="assignedProjectUsers" @closeUserRoles="closeUserRoles"
          @saveProjectUserRole="saveProjectUserRole" @cancelBulkChangeRole="cancelBulkChangeRole"
          @bulkChangeRole="bulkChangeRole" @saveRemoveUsers="saveRemoveUsers" @saveBulkChangeRole="saveBulkChangeRole"
          @removeAllUsers="removeAllUsers" @editUsers="editUsers" @cancelEditRoles="cancelEditRoles">
        </ManageUsersModal>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters, mapMutations } from "vuex";
import SettingsSidebar from "./SettingsSidebar.vue";
import SettingsProjectModal from "./modals/SettingsProjectModals.vue"
import PortfolioProjectsModal from "./modals/PortfolioProjectsModal.vue";
import ManageUsersModal from "./modals/ManageUsersModal.vue"
import { API_BASE_PATH } from "./../../../mixins/utils";
import MessageDialogService from "../../../services/message_dialog_service.js";
export default {
  name: "SettingsProjects",
  components: {
    SettingsSidebar,
    SettingsProjectModal,
    PortfolioProjectsModal,
    ManageUsersModal
  },
  props: ["currentFacility", "facility"],
  data() {
    return {
      userids: null,
      currentRoleName: {},
      searchProjects: '',
      changeRoleMode: false,
      isIndeterminate: true,
      dialogVisible: false,
      dialog2Visible: false,
      rolesVisible: false,
      confirmTransfer: false,
      isEditingRoles: false,
      expandRowKeys: [],
      componentKey: 0,
      rowIndex_1: null,
      roleRowId: null,
      programId: this.$route.params.programId,
      search: "",
      searchRoleUsers: '',
      rowIndex: null,
      rowId: null,
      projId: null,
      projectRowData: null,
      hideSaveBtn: false,
      projectId: null,
      searchContractUsers: "",
      selectedProjectGroup: null,
      newProjectNameText: "",
      value: "",
    };
  },
  mounted() {
    this.fetchGroups(this.$route.params.programId);
    //Move fetchRole back to row click method
    this.fetchRoles(this.$route.params.programId)
    //this.fetchPortfolioProjects(this.$route.params.programId)
    this.fetchProgramSettingsProjects(this.$route.params.programId)
  },
  methods: {
    ...mapGetters(['getToken']),
    ...mapActions([
      "fetchFacilities",
      "fetchCurrentProject",
      "fetchGroups",
      "updateProjects",
      "addUserToRole",
      "fetchRoles",
      "fetchProgramSettingsProjects",
      "fetchPortfolioProjects",
      "removeUserRole",
      "removeOrDeleteProject",
      "deleteProgramProject",
      "removePortfolioProject",
      "bulkUpdateUserRoles"
    ]),
    ...mapMutations([
      "setProjectGroupFilter",
      "setGroupFilter",
      "SET_CHECKED_PORTFOLIO_PROJECTS",
      "SET_CHECK_ALL_PROJECTS",
      "SET_ADD_USER_TO_ROLE_STATUS",
      "SET_PORTFOLIO_PROJECTS_STATUS",
      "SET_PROJECT_ROLE_USERS",
      "SET_ASSIGNED_PROJECT_USERS",
      "SET_REMOVE_PROJECT_ROLE_STATUS",
      "SET_PROJECT_ROLE_NAMES",
      "SET_BULK_PROJECT_ROLE_NAMES",
      "SET_REMOVE_PORTFOLIO_PROJECTS_STATUS",
      "SET_PROGRAM_SETTINGS_PROJECTS_STATUS",
      "SET_BULK_UPDATE_ROLE_STATUS"
    ]),
    goToProject(index, rows) {
      window.location.pathname = `/programs/${this.programId}/sheet/projects/${rows.id}/`
    },
    log(e) {
      // console.log('tableData:', e)
    },
    setSearchProject(val) {
      this.searchProjects = val
    },
    setProjectNameText(val) {
      this.newProjectNameText = val
    },
    editUsers(index, rowData) {
      this.userids = this.projectUsers.data.filter(t => t.role_id == rowData)
      this.SET_ASSIGNED_PROJECT_USERS(this.assignedUsers)
      this.rowIndex_1 = index;
      this.roleRowId = rowData
      this.isEditingRoles = true;
    },
    closeImportProjectBtn() {
      this.dialog2Visible = false;
      this.SET_CHECKED_PORTFOLIO_PROJECTS([0]);
    },
    checkAllChange() {
      this.isIndeterminate = false;
    },
    // removeProject(index, rows) {
    //     // let id = [rows.id];
    //     let project = {
    //       g: {
    //         id: rows.id,
    //         programId: this.$route.params.programId,
    //         },
    //      };      

    //     this.$confirm(
    //       `Are you sure you want to remove ${rows.facilityName} from your program?`,
    //       "Confirm Remove",
    //       {
    //         confirmButtonText: "Remove",
    //         cancelButtonText: "Cancel",
    //         type: MessageDialogService.msgTypes.WARNING,
    //       }
    //      ).then(() => {
    //        alert("We're still working on the remove project functionality :)")
    //       // this.removeOrDeleteProject({ ...project });
    //     });
    //   },
    deleteProject(index, rows) {
      //  console.log(rows)
      let id = rows.id;
      let programId = this.$route.params.programId;
      this.$confirm(
        `Are you sure you want to delete ${rows.facilityName}?`,
        "Confirm Delete",
        {
          confirmButtonText: "Delete",
          cancelButtonText: "Cancel",
        }
      ).then(() => {
        this.deleteProgramProject({ programId, id }).then((value) => {
          if (value === 200) {
            this.fetchCurrentProject(this.$route.params.programId);
            MessageDialogService.showDialog({
              message: `${rows.facilityName} was deleted successfully.`,
            });
          }
        });
      });
    },
    removeProject(index, rows) {
      let fpId = rows.facilityProjectId;
      let pId = this.$route.params.programId;
      this.$confirm(
        `Removing ${rows.facilityName} from your program will also delete all its data.  Are you sure you want to remove this project?`,
        "Confirm Remove",
        {
          confirmButtonText: "Remove",
          cancelButtonText: "Cancel",
          type: MessageDialogService.msgTypes.WARNING,
        }
      ).then(() => {
        this.removePortfolioProject({ fpId, pId });
      });

    },
    importProjectName() {
      let data = this.checkedPortfolioProjects;
      if (this.facilities && this.facilities.length > 0) {
        let savedProjects = this.facilities.map((g) => g.id);
        for (let i = 0; i <= this.facilities.length; i++) {
          if (savedProjects[i] !== undefined) {
            data.push(savedProjects[i]);
          }
        }
      }

      let projects = {
        groupData: {
          ids: [...new Set(data)].filter(t => t !== 0),
          programId: this.$route.params.programId,
        },
      };
      // console.log("Without filter: ",[...new Set(data)])
      //   console.log("With filter: ", [...new Set(data)].filter(t => t !== 0))

      this.updateProjects({
        ...projects,
      });
      this.confirmTransfer = false;
    },
    saveRemoveUsers(index, rowData) {
      let user_ids = this.assignedProjectUsers.map(t => t.id);
      let assigned = this.assignedUsers.map(t => t.id);
      let ids = assigned.filter(t => !user_ids.includes(t));
      let projectUserRoleData = {
        userData: {
          roleId: rowData,
          projectId: this.projId,
          programId: this.$route.params.programId,
          userIds: ids,
        },
      };
      // console.log(projectUserRoleData)
      this.removeUserRole({
        ...projectUserRoleData,
      });
    },
    bulkChangeRole(index, rowData) {
      this.currentRoleName = this.getRoles.filter(t => t.id == rowData).map(t => t)[0];
      this.changeRoleMode = true
      this.rowIndex_1 = index;
      this.roleRowId = rowData;
    },
    saveBulkChangeRole(index, rowData) {
      this.userids = this.projectUsers.data.filter(t => t.role_id == rowData)
      this.SET_ASSIGNED_PROJECT_USERS(this.assignedUsers)
      let old_role = this.getRoles.filter(t => t.id == rowData).map(t => t)[0]
      let new_role;
      if (this.bulkChangeProjectRoleNames.id) {
        new_role = this.bulkChangeProjectRoleNames
      } else new_role = this.currentRoleName
      let user_ids = this.assignedProjectUsers.map(t => t.id);
      let ids = this.assignedUsers.map(t => t.id).filter(t => user_ids.includes(t));
      let roleUsers = this.projectUsers.data.filter(t => t.role_id == rowData)

      let projectUserRoleData = {
        userData: {
          roleId: new_role.id,
          roleUserIds: roleUsers.map(t => t.id),
          userIds: ids,
          programId: this.$route.params.programId,
        },
      };

      this.bulkUpdateUserRoles({
        ...projectUserRoleData,
      });
      // this.fetchRoles(this.$route.params.programId)   
      //  this.rowIndex_1 = null;
      //  this.roleRowId = null; 
      //  if (this.rowIndex_1 == null && this.roleRowId == null){
      //     this.changeRoleMode = false;      
      //  }
    },
    removeAllUsers(index, rowData) {
      this.userids = this.projectUsers.data.filter(t => t.role_id == rowData)
      this.SET_ASSIGNED_PROJECT_USERS(this.assignedUsers)
      this.$confirm(
        `Are you sure you want to remove all users from this project role?`,
        "Confirm Remove",
        {
          confirmButtonText: "Remove",
          cancelButtonText: "Cancel",
          type: MessageDialogService.msgTypes.WARNING,
        }
      ).then(() => {
        let user_ids = this.assignedProjectUsers.map(t => t.id);
        let ids = this.assignedUsers.map(t => t.id).filter(t => user_ids.includes(t));
        let projectUserRoleData = {
          userData: {
            roleId: rowData,
            projectId: this.projId,
            programId: this.$route.params.programId,
            userIds: ids,
          },
        };

        console.log(this.assignedUsers)
        this.removeUserRole({
          ...projectUserRoleData,
        });
      });

    },
    cancelEditRoles(index, rowData) {
      this.isEditingRoles = false;
      this.roleRowId = null;
      this.rowIndex_1 = null;
    },
    cancelBulkChangeRole() {
      this.changeRoleMode = false;
      this.roleRowId = null;
      this.rowIndex_1 = null;
      this.bulkChangeProjectRoleNames = {}
    },
    openProjectGroup() {
      this.dialog2Visible = !this.dialog2Visible;
    },
    cancelCreateGroup() {
      this.dialogVisible = false;
      this.newProjectNameText = "";
    },
    closeUserRoles() {
      this.rolesVisible = false;
      this.isEditingRoles = false;
      this.roleRowId = null;
      this.rowIndex_1 = null;
      this.SET_PROJECT_ROLE_USERS([])
    },
    addAnotherProject() {
      this.C_projectGroupFilter = "";
      this.newProjectNameText = "";
      this.hideSaveBtn = false;
    },
    handleExpandChange(row, expandedRows) {
      this.projId = row.facilityProjectId;
      const lastId = this.expandRowKeys[0];
      this.expandRowKeys = this.projId === lastId ? [] : [this.projId];
    },
    addUserRole(index, rows) {
      this.rolesVisible = !this.rolesVisible
      this.projId = rows.facilityProjectId
      this.projectRowData = rows
    },
    addProject() {
      this.dialogVisible = !this.dialogVisible;
      this.C_projectGroupFilter = null;
      this.newProjectNameText = "";
    },
    editMode(index, rows) {
      this.rowIndex = index
      this.rowId = rows.id
    },
    projectFormData() {
      let formData = {
        "facility[facility_name]": this.newProjectNameText,
        "facility[status]": "active",
        "facility[project_ids][]": this.$route.params.programId,
        "facility[is_portfolio]": false,
        "commit": "Create Project",
      }
      if (this.C_projectGroupFilter) {
        formData["facility[facility_group_id]"] = this.C_projectGroupFilter.id;
      }
      return formData
    },
    saveNewProject(localProjectName) {
      // e.preventDefault();
      // this.newProjectNameText = localProjectName
      let url = `${API_BASE_PATH}/program_settings/facilities?project_id=${this.$route.params.programId}`
      let method = "POST";
      axios({
        method: method,
        url: url,
        data: this.projectFormData(),
        headers: {
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
            .attributes["content"].value,
          'x-token': this.getToken()
        },
      }).then((response) => {
        if (response.status === 200) {
          MessageDialogService.showDialog({
            message: `New Project ${this.newProjectNameText} has been saved successfully.`,
          });
          this.fetchCurrentProject(this.programId)
          this.hideSaveBtn = true;
        }
      });
      this.dialogVisible = false
    },
    cancelEdits(index, rows) {
      this.rowIndex = null;
      this.rowId = null;
    },
    saveProjectUserRole(index, rows) {
      let user_ids = this.projectRoleUsers.map(t => t.id)
      let projectUserRoleData = {
        userData: {
          roleId: this.projectRoleNames.id,
          userIds: user_ids,
          programId: this.$route.params.programId,
          projectId: this.projId
        },
      };
      this.addUserToRole({
        ...projectUserRoleData,
      });
    },

    saveEdits(index, rows) {
      let updatedProjectName = rows.facilityName;
      let projectId = rows.id;
      let formData = {
        "facility[project_id]": this.$route.params.programId,
        "facility[facility_name]": updatedProjectName,
      }
      let url = `${API_BASE_PATH}/program_settings/facilities/${projectId}`;
      let method = "PUT";
      if (rows.facilityGroupId) {
        formData["facility[facility_group_id]"] = rows.facilityGroupId;
      }
      axios({
        method: method,
        url: url,
        data: formData,
        headers: {
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
            .attributes["content"].value
        },
      }).then((response) => {
        if (response.status === 200) {
          MessageDialogService.showDialog({
            message: `Edits has been saved successfully.`,


          });
          this.fetchCurrentProject(this.programId)
          this.rowIndex = null;
          this.rowId = null;
        }
      });
    },
    _isallowedProject(c, salut) {
      // console.log(c, salut)
      return this.checkPrivileges("ProjectSettingProjectList", salut, this.$route, { method: "isallowedProject", facility_project_id: c })
    },
    _isallowed(salut) {
      return this.checkPrivileges("SettingsProjects", salut, this.$route, { settingType: "Projects" })
    },
  },
  computed: {
    ...mapGetters([
      "contentLoaded",
      "currentProject",
      "projectsLoaded",
      "facilities",
      "facilityGroups",
      "groups",
      "getCheckAllProjects",
      "getCheckedPortfolioProjects",
      "getRoles",
      "getRolesLoaded",
      "getTransferData",
      "getNewGroups",
      "portfolioProjectsStatus",
      "tableData",
      "portfolioProjects",
      "programSettingsProjects",
      "projectUserRoles",
      "getProjectGroupFilter",
      "getProjectRoleUsers",
      "getProjectRoleNames",
      "getBulkProjectRoleNames",
      "getGroupFilter",
      "facilityGroupFacilities",
      "filteredFacilityGroups",
      "addUserToRoleStatus",
      "getAssignedProjectUsers",
      "removeProjectRoleStatus",
      "removePortfolioProjectsStatus",
      "bulkProjectAddStatus",
      " bulkUpdateRoleStatus"
    ]),
    // Filter for Projects Table
    C_groupFilter: {
      get() {
        return this.getGroupFilter;
      },
      set(value) {
        // console.log(value)
        this.setGroupFilter(value);
      },
    },
    projectUsers() {
      if (this.getRoles && this.getRoles.length > 0) {
        let roleUsers = this.getRoles.map(t => t.role_users).filter(t => t.length > 0)
        if (this.projId) {
          let groupByRoles = [].concat.apply([], roleUsers).filter(t => this.projId == t.facility_project_id)
          // const reducedRoles = groupByRoles.reduce((acc, { role_id, role_name, user_full_name, user_id, facility_project_id }) => (
          //     { 
          //       ...acc, 
          //       [role_id]: acc[role_id] ? [ ...acc[role_id], { role_name, user_full_name, user_id, facility_project_id }] : [ { role_name, user_full_name, user_id, facility_project_id } ],
          //     }
          // ), {});
          //     console.log(reducedRoles)
          return {
            data: groupByRoles,
            roleIds: _.uniq(groupByRoles.map(t => t.role_id)),
          }
        } else return [].concat.apply([], roleUsers)
      }
    },
    myRolesTable() {
      if (this.getRoles && this.getRoles.length > 0) {
        let roleUsers = this.getRoles.map(t => t.role_users).filter(t => t.length > 0)
        if (this.projId) {
          let groupByRoles = [].concat.apply([], roleUsers).filter(t => this.projId == t.facility_project_id)
          const reducedRoles = groupByRoles.reduce((acc, { role_id, role_name, user_full_name, user_id, facility_project_id }) => (
            {
              ...acc,
              [role_id]: acc[role_id] ? [...acc[role_id], { role_name, user_full_name, user_id, facility_project_id }] : [{ role_name, user_full_name, user_id, facility_project_id }],
            }
          ), {});
          // console.log(reducedRoles)
          return reducedRoles
        } else return [].concat.apply([], roleUsers)
      }
    },
    programUsers() {
      if (this.currentProject) {
        if (this.currentProject.users && this.currentProject.users.length > 0) {
          return this.currentProject.users.filter(t => t)
        }
      }
    },
    groupList() {
      if (
        this.groups &&
        this.groups.length > 0 &&
        this.getTransferData &&
        this.getTransferData.length > 0
      ) {
        return this.groups.filter(u => this.getTransferData.includes(u.id))
      } else if (
        this.groups &&
        this.groups.length > 0 &&
        this.facilityGroups && this.facilityGroups.length > 0 &&
        !this.getTransferData
      ) {
        let programGroupIds = this.facilityGroups.map(t => t.id)
        return this.groups.filter(u => programGroupIds.includes(u.id))
      } else return []
    },

    backToSettings() {
      return `/programs/${this.$route.params.programId}/settings`;
    },
    // Filter when adding new Project
    C_projectGroupFilter: {
      get() {
        return this.getProjectGroupFilter;
      },
      set(value) {
        // console.log(value)
        this.setProjectGroupFilter(value);
      },
    },
    assignedUsers() {
      //   //  Commenting out this setter which is executed in the handleExpandChange() method.  Useful if we want saved users to populate dropdown upon loading
      if (this.userids && this.programUsers && this.projectUsers && this.projectUsers.data && this.projectUsers.data.length > 0) {
        let tableUserIds = this.userids.map(t => t.user_id)
        return this.programUsers.filter(t => tableUserIds.includes(t.id))
      }
    },
    viableProjectUsers() {
      if (this.programUsers && this.projectUsers && this.projectUsers.data) {
        let assignedUserIds = this.projectUsers.data.map(t => t.user_id)
        return this.programUsers.filter(t => !assignedUserIds.includes(t.id))
      }
    },
    projectRoleUsers: {
      get() {
        return this.getProjectRoleUsers
      },
      set(value) {
        this.SET_PROJECT_ROLE_USERS(value)
        //  console.log(value)
      }
    },
    assignedProjectUsers: {
      get() {
        return this.getAssignedProjectUsers
      },
      set(value) {
        this.SET_ASSIGNED_PROJECT_USERS(value)
        //  console.log(value)
      }
    },
    projectRoleNames: {
      get() {
        return this.getProjectRoleNames
      },
      set(value) {
        this.SET_PROJECT_ROLE_NAMES(value)
        //  console.log(value)
      }
    },
    bulkChangeProjectRoleNames: {
      get() {
        return this.getBulkProjectRoleNames
      },
      set(value) {
        this.SET_BULK_PROJECT_ROLE_NAMES(value)
        //  console.log(value)
      }
    },
    projectData() {
      if (
        // this.projectsLoaded &&
        this.facilities &&
        this.facilities.length > 0
      ) {
        return (
          this.facilities.filter((td) => {
            if (this.C_groupFilter && this.C_groupFilter.length > 0) {
              let group = this.C_groupFilter.map((t) => t.name);
              return group.includes(td.facilityGroupName);
            } else return true;
          })
        );
      }
    },
    programProjects() {
      //Removes current Program  Projects from checkbox options in Add Protfolio Group popup
      if (this.projectData && this.portfolioProjects && this.portfolioProjects.length > 0) {

        let filteredProjects = this.portfolioProjects.filter(
          (pG) => !this.projectData.map((g) => g.id).includes(pG.id)
        )
        let data = filteredProjects.sort((a, b) => a.facility_name.localeCompare(b.facility_name)).filter(t => {
          if (this.searchProjects !== '' && t) {
            return (
              t.facility_name.toLowerCase().match(this.searchProjects.toLowerCase())
            )
          } else return true
        })
        return data
      }
      if (!this.projectData || this.projectData && !(this.projectData.length > 0)) {
        // console.log('nada')
        let data = this.portfolioProjects.sort((a, b) => a.facility_name.localeCompare(b.facility_name)).filter(t => {
          if (this.searchProjects !== '' && t) {
            return (
              t.facility_name.toLowerCase().match(this.searchProjects.toLowerCase())
            )
          } else return true
        })
        return data
      }
    },
    checkAllProjects: {
      get() {
        return this.getCheckAllProjects;
      },
      set(value) {
        // console.log(value);
        this.SET_CHECK_ALL_PROJECTS(value);
        if (value == true) {
          let checkP = this.portfolioProjects.map((p) => p.id);
          this.SET_CHECKED_PORTFOLIO_PROJECTS(checkP);
        } else if (value == false) {
          this.SET_CHECKED_PORTFOLIO_PROJECTS([0]);
        }
      },
    },
    checkedPortfolioProjects: {
      get() {
        return this.getCheckedPortfolioProjects;
      },
      set(value) {
        let checkedCount = value.length;

        // this.SET_CHECK_ALL(checkedCount === this.portfolioGroups.length);
        this.SET_CHECKED_PORTFOLIO_PROJECTS(value);
        this.isIndeterminate =
          checkedCount > 0 && checkedCount < this.programProjects.length;
      },
    },
  },
  watch: {
    addUserToRoleStatus: {
      handler() {
        if (this.addUserToRoleStatus == 204 || this.addUserToRoleStatus == 200) {
          MessageDialogService.showDialog({
            message: `Succesfully added user/role to project.`,
          });
          this.SET_ADD_USER_TO_ROLE_STATUS(0);
          this.fetchRoles(this.$route.params.programId)
          this.fetchCurrentProject(this.$route.params.programId)
          this.SET_PROJECT_ROLE_NAMES([])
          this.SET_BULK_PROJECT_ROLE_NAMES([])
          this.SET_PROJECT_ROLE_USERS([])
          this.changeRoleMode = false;
          this.rowIndex_1 = null;
          this.roleRowId = null;
        }
      },
    },
    bulkUpdateRoleStatus: {
      //This status property is not working.  Once fixed, we need to move all this actions out of the method and uncomment these. 
      handler() {
        if (this.bulkUpdateRoleStatus == 204 || this.bulkUpdateRoleStatus == 200) {
          MessageDialogService.showDialog({
            message: `Succesfully changed user roles.`,


          });
          console.log("bulkUpdateRoleStatus is good")


          // this.SET_BULK_UPDATE_ROLE_STATUS(0);
          // this.fetchRoles(this.$route.params.programId)  
          // this.fetchCurrentProject(this.$route.params.programId)
          // this.SET_PROJECT_ROLE_NAMES([])
          // this.SET_BULK_PROJECT_ROLE_NAMES([])
          // this.SET_PROJECT_ROLE_USERS([])
          // this.changeRoleMode = false;
        }
      },
    },
    bulkProjectAddStatus: {
      handler() {
        if (this.bulkProjectAddStatus == 200) {
          MessageDialogService.showDialog({
            message: `Successfully added projects from program.`,
          });
          this.SET_PROGRAM_SETTINGS_PROJECTS_STATUS(0);
          this.fetchCurrentProject(this.$route.params.programId);

          //  this.newGroupName =
        }
      },
    },
    removePortfolioProjectsStatus: {
      handler() {
        if (this.removePortfolioProjectsStatus == 200) {
          MessageDialogService.showDialog({
            message: `Successfully removed project from program.`,


          });
          this.SET_REMOVE_PORTFOLIO_PROJECTS_STATUS(0);
          this.fetchCurrentProject(this.$route.params.programId);

          //  this.newGroupName =
        }
      },
    },
    portfolioProjectsStatus: {
      handler() {
        if (this.portfolioProjectsStatus == 200) {
          MessageDialogService.showDialog({
            message: `Saved successfully.`,


          });
          this.SET_PORTFOLIO_PROJECTS_STATUS(0);
          this.fetchPortfolioProjects(this.$route.params.programId)
          this.fetchCurrentProject(this.$route.params.programId);

          //  this.newGroupName =
        }
      },
    },
    removeProjectRoleStatus: {
      handler() {
        if (this.removeProjectRoleStatus == 204 || this.removeProjectRoleStatus == 200) {
          MessageDialogService.showDialog({
            message: `Succesfully removed user(s) from role.`,
          });
          this.fetchRoles(this.$route.params.programId)
          this.SET_REMOVE_PROJECT_ROLE_STATUS(0);
          this.isEditingRoles = false;
          this.rowIndex_1 = null;
          this.changeRoleMode = false;
        }
      },
    },
  },

};
</script>

<style scoped lang="scss">
.fs-50 {
  font-size: .50rem;
}

::v-deep.el-popper {
  .select-popper {
    display: none;
  }
}

.userNames {
  // background-color: #F8F9FA;
  border-radius: .25rem;
  margin-right: 2px;
  padding: 1px 3px;
  border: solid lightgray .75px;
}

.buttonWrapper {
  border-bottom: lightgray solid 1px;
}

.modalBtns {
  box-shadow: 0 2.5px 5px rgba(56, 56, 56, 0.19), 0 3px 3px rgba(56, 56, 56, 0.23);
}

.right {
  text-align: right;
}

::v-deep.el-collapse-item__header {
  padding-left: 1.5rem;
}

.fa-calendar {
  font-size: x-large;
}

::v-deep.el-table th.el-table__cell>.cell {
  color: #212529;
  font-size: 1.15rem;
}

.tabs {
  background-color: #ededed;
  border-top: solid 0.3px #ededed;
  width: min-content;
  display: flex;
  box-shadow: 0 2.5px 2.5px rgba(0, 0, 0, 0.19), 0 3px 3px rgba(0, 0, 0, 0.23);

  .tab {
    cursor: pointer;
    padding: 7px 10px;
    border-radius: 0.1rem;
    font-weight: 500;
    letter-spacing: 1;
    transition: auto;
    font-size: 75%;
  }

  .active {
    color: #fff !important;
    background-color: #383838 !important;
  }
}

a {
  color: unset;
  text-decoration: unset;
}

.right-panel {
  height: calc(100vh - 100px);
  overflow-y: auto;
  overflow-x: hidden;
}

::v-deep.el-table__row .el-input .el-input__inner {
  border-style: none;
}

// ::v-deep.el-table__header, .el-table{
//   width: auto !important;
// }
::v-deep.hover-row .el-input .el-input__inner {
  border-style: none;
}

::v-deep.el-table {
  .el-input__inner {
    font-size: 16px !important;
    font-weight: 300 !important;
  }
}

::v-deep.el-dialog__close.el-icon.el-icon-close {
  display: none;
}

h5 {
  word-break: break-word;
}

.addProjectDialog {
  ::v-deep.el-dialog__body {
    padding-top: 0 !important;
  }


}

.addUserRole {
  ::v-deep.el-dialog__body {
    padding-top: 0 !important;
  }

  ::v-deep.el-dialog {
    width: 55%;
  }
}

.portfolioNames {
  ::v-deep.el-dialog__header {
    padding-top: 0 !important;
  }

  ::v-deep.el-dialog__headerbtn {
    display: none;
  }

  ::v-deep.el-dialog__body {
    padding-top: 0 !important;
    height: 68vh;
  }

  ::v-deep.el-checkbox-group {
    overflow-y: auto;
    overflow-x: hidden;
    height: 35vh;
  }
}

div.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  text-align: right;
  padding-top: 10px;
  z-index: 10;
  background: #fff;
}

.addGroupsHeader,
h5 {
  line-height: 2.2;
  word-break: break-word;
}

.addProjectDialog {
  ::v-deep.el-dialog__body {
    padding-top: 0 !important;
  }

  ::v-deep.el-dialog {
    width: 30%;
  }
}
</style>