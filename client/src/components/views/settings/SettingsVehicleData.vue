<template>
    <el-tabs type="border-card" @tab-click="handleClick">
        <el-tab-pane class="p-3" style="postion:relative" label="PRIME">
            <el-table v-if="tableData" :data="tableData
        .filter(
            (data) =>
                !search ||
                data.contract_vehicle && data.contract_vehicle.name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                data.contract_vehicle.full_name && data.contract_vehicle.full_name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                data.contract_vehicle.contract_agency && data.contract_vehicle.contract_agency.name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                data.contract_vehicle.contract_sub_category && data.contract_vehicle.contract_sub_category.name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                data.contract_vehicle.contract_vehicle_type && data.contract_vehicle.contract_vehicle_type.name
                    .toLowerCase()
                    .includes(search.toLowerCase())
        )
        .reverse()
        " style="width: 100%" highlight-current-row height="450" ref="table" :row-key="(row) => row.id"
                :expand-row-keys="expandRowKeys" @expand-change="handleExpandChange"
                :default-sort="{ prop: 'name', order: 'ascending' }">
                <el-table-column prop="prime_name" label="Prime">
                    <template slot-scope="scope">
                        <span v-if="scope.row.contract_vehicle.prime_name">
                            {{ scope.row.contract_vehicle.prime_name }}
                        </span>
                        <span v-else>
                            MicroHealth, LLC
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="Vehicle Nickname">
                    <template slot-scope="scope">
                        <span v-if="scope.row.contract_vehicle.name">
                            {{ scope.row.contract_vehicle.name }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="Vehicle Full Name">
                    <template slot-scope="scope">
                        <span v-if="scope.row.contract_vehicle.full_name">
                            {{ scope.row.contract_vehicle.full_name }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="Contracting Agency">
                    <template slot-scope="scope">
                        <span v-if="scope.row.contract_vehicle.contract_agency &&
        scope.row.contract_vehicle.contract_agency.name !==
        null
        ">
                            {{ scope.row.contract_vehicle.contract_agency.name }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="Vehicle Type">
                    <template slot-scope="scope">
                        <span v-if="scope.row.contract_vehicle.contract_vehicle_type &&
        scope.row.contract_vehicle.contract_vehicle_type
            .name !== null
        ">
                            {{
        scope.row.contract_vehicle.contract_vehicle_type.name
    }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="facility_group" sortable filterable label="Group">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.facility_group_id" class="w-100"
                            v-if="rowId == scope.row.contract_vehicle.id" filterable track-by="id" clearable
                            value-key="id" placeholder="Search and select Group">
                            <el-option v-for="item in facilityGroups" :value="item.id" :key="item.id"
                                :label="item.name">
                            </el-option>
                        </el-select>

                        <span v-else>
                            <span v-if="scope.row.facility_group &&
        scope.row.facility_group.name &&
        rowId !== scope.row.contract_vehicle.id
        ">
                                {{ scope.row.facility_group.name }}
                            </span>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="Actions" align="right">
                    <template slot-scope="scope">
                        <span class="px-0">
                            <el-button size="small" type="default" v-tooltip="`Change Group`"
                                @click.prevent="editMode(scope.$index, scope.row)"
                                v-if="scope.$index !== rowIndex && _isallowed('write')" class="bg-light btn-sm px-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14px" fill="#dd9036"
                                    viewBox="0 0 640 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                                    <path
                                        d="M256 64l128 0 0 64-128 0 0-64zM240 0c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48l48 0 0 32L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0 0 32-48 0c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48l160 0c26.5 0 48-21.5 48-48l0-96c0-26.5-21.5-48-48-48l-48 0 0-32 256 0 0 32-48 0c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48l160 0c26.5 0 48-21.5 48-48l0-96c0-26.5-21.5-48-48-48l-48 0 0-32 96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-256 0 0-32 48 0c26.5 0 48-21.5 48-48l0-96c0-26.5-21.5-48-48-48L240 0zM96 448l0-64 128 0 0 64L96 448zm320-64l128 0 0 64-128 0 0-64z" />
                                </svg>
                            </el-button>
                            <el-button size="small" type="default" v-tooltip="`Manage User(s)`"
                                @click.prevent="addUserRole(scope.$index, scope.row)" v-if="scope.$index !== rowIndex"
                                class="bg-primary text-light btn-sm px-2">
                                <i class="fas fa-users"></i>
                            </el-button>
                            <el-button size="small" type="default" v-if="scope.$index == rowIndex"
                                @click.prevent="saveEdits(scope.$index, scope.row)" v-tooltip="`Save`"
                                class="bg-primary btn-sm text-light px-2">
                                <i class="far fa-save"></i>
                            </el-button>
                            <el-button size="small" type="default" v-tooltip="`Cancel Edit`"
                                v-if="scope.$index == rowIndex" @click.prevent="cancelEdits(scope.$index, scope.row)"
                                class="bg-secondary btn-sm text-light px-2">
                                <i class="fas fa-ban"></i>
                            </el-button>
                            <el-button type="default" size="small" class="bg-light btn-sm px-2"
                                v-tooltip="'Remove Vehicle'" @click.prevent="
        removeVehicleBtn(scope.$index, scope.row)
        " v-if="scope.$index !== rowIndex && _isallowed('write')">
                                <i class="fa fa-minus-circle text-danger"></i>
                            </el-button>
                            <el-button size="small" type="default" v-tooltip="`Go To Vehicle`" v-if="_isallowedContracts(
        scope.row.id, // should be scope.row.project_contract_vehicle_id but returns undefined
        'read'
    )
        " @click.prevent="goToVehicle(scope.$index, scope.row)" class="bg-success text-light btn-sm">
                                <i class="fas fa-arrow-alt-circle-right"></i>
                            </el-button>
                        </span>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane class="p-3" style="postion:relative" label="SUBCONTRACT">
            <el-table v-if="subTableData" :data="subTableData
        .filter(
            (data) =>
                !search ||
                data.contract_vehicle && data.contract_vehicle.name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                data.contract_vehicle && data.contract_vehicle.full_name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                data.contract_vehicle && data.contract_vehicle.contract_agency.name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                data.contract_vehicle && data.contract_vehicle.subprime_name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                data.contract_vehicle && data.contract_vehicle.contract_vehicle_type.name
                    .toLowerCase()
                    .includes(search.toLowerCase())
        )
        .reverse()
        " style="width: 100%" highlight-current-row height="450" ref="table" :row-key="(row) => row.id"
                :expand-row-keys="expandRowKeys" @expand-change="handleExpandChange"
                :default-sort="{ prop: 'name', order: 'ascending' }">
                <el-table-column prop="subprime_name" label="Subcontract Prime">
                    <template slot-scope="scope">
                        <span v-if="scope.row.contract_vehicle.subprime_name">
                            {{ scope.row.contract_vehicle.subprime_name }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="Vehicle Nickname">
                    <template slot-scope="scope">
                        <span v-if="scope.row.contract_vehicle.name">
                            {{ scope.row.contract_vehicle.name }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="Vehicle Full Name">
                    <template slot-scope="scope">
                        <span v-if="scope.row.contract_vehicle.full_name">
                            {{ scope.row.contract_vehicle.full_name }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="Contract Name">
                    <template slot-scope="scope">
                        <span v-if="scope.row.contract_vehicle.contract_name">
                            {{ scope.row.contract_vehicle.contract_name }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="Contracting Agency" width="150">
                    <template slot-scope="scope">
                        <span v-if="scope.row.contract_vehicle.contract_agency &&
        scope.row.contract_vehicle.contract_agency.name !==
        null
        ">
                            {{ scope.row.contract_vehicle.contract_agency.name }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="Vehicle Type" width="150">
                    <template slot-scope="scope">
                        <span v-if="scope.row.contract_vehicle.contract_vehicle_type &&
        scope.row.contract_vehicle.contract_vehicle_type
            .name !== null
        ">
                            {{
        scope.row.contract_vehicle.contract_vehicle_type.name
    }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop="facility_group" sortable filterable label="Group">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.facility_group_id" class="w-100"
                            v-if="rowId == scope.row.contract_vehicle.id" filterable track-by="id" clearable
                            value-key="id" placeholder="Search and select Group">
                            <el-option v-for="item in facilityGroups" :value="item.id" :key="item.id"
                                :label="item.name">
                            </el-option>
                        </el-select>

                        <span v-else>
                            <span v-if="scope.row.facility_group &&
        scope.row.facility_group.name &&
        rowId !== scope.row.contract_vehicle.id
        ">
                                {{ scope.row.facility_group.name }}
                            </span>
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
                        <el-button size="small" type="default" v-tooltip="`Change Group`"
                            @click.prevent="editMode(scope.$index, scope.row)"
                            v-if="scope.$index !== rowIndex && _isallowed('write')" class="bg-light btn-sm px-2">
                            <i class="fal fa-network-wired mh-blue-text"></i>
                        </el-button>
                        <el-button size="small" type="default" v-tooltip="`Manage User(s)`"
                            @click.prevent="addUserRole(scope.$index, scope.row)" v-if="scope.$index !== rowIndex"
                            class="bg-primary text-light btn-sm px-2">
                            <i class="fas fa-users"></i>
                        </el-button>
                        <el-button size="small" type="default" v-if="scope.$index == rowIndex"
                            @click.prevent="saveEdits(scope.$index, scope.row)" v-tooltip="`Save`"
                            class="bg-primary btn-sm text-light px-2">
                            <i class="far fa-save"></i>
                        </el-button>
                        <el-button size="small" type="default" v-tooltip="`Cancel Edit`" v-if="scope.$index == rowIndex"
                            @click.prevent="cancelEdits(scope.$index, scope.row)"
                            class="bg-secondary btn-sm text-light px-2">
                            <i class="fas fa-ban"></i>
                        </el-button>
                        <el-button size="small" type="default" class="bg-light btn-sm px-2" v-tooltip="'Remove Vehicle'"
                            @click.prevent="removeVehicleBtn(scope.$index, scope.row)"
                            v-if="scope.$index !== rowIndex && _isallowed('write')">
                            <i class="fa fa-minus-circle text-danger"></i>
                        </el-button>
                        <el-button size="small" type="default" v-tooltip="`Go To Vehicle`"
                            v-if="_isallowedContracts(scope.row.id, 'read')"
                            @click.prevent="goToVehicle(scope.$index, scope.row)"
                            class="bg-success text-light btn-sm px-2">
                            <i class="fas fa-arrow-alt-circle-right"></i>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
    </el-tabs>
</template>
<script>
export default {
    name: 'SettingsVehicleData',
    props: ['tableData', 'search', 'facilityGroups', 'rowId', 'rowIndex', "subTableData", "expandRowKeys"],
    methods: {
        editMode(scope, rowData) {
            this.$emit('editMode', scope, rowData)
        },
        removeVehicleBtn(scope, rowData) {
            this.$emit('removeVehicleBtn', scope, rowData)
        },
        saveEdits(scope, rowData) {
            this.$emit('saveEdits', scope, rowData)
        },
        addUserRole(scope, rowData) {
            this.$emit('addUserRole', scope, rowData)
        },
        cancelEdits(scope, rowData) {
            this.$emit('cancelEdits', scope, rowData)
        },
        handleClick(tab, event) {
            console.log(tab);
            console.log(`${("event:", event)}`);
        },
        handleExpandChange(row, expandedRows) {
            this.$emit('handleExpandChange', row, expandedRows)
        },
        goToVehicle(scope, rowData) {
            this.$emit('goToVehicle', scope, rowData)
        },
        _isallowed(salut) {
            return this.checkPrivileges("SettingsVehicles", salut, this.$route, {
                settingType: "Contracts",
            });
        },
        _isallowedContracts(c, salut) {
            return this.checkPrivileges(
                "ProjectSettingVehicleList",
                salut,
                this.$route,
                { method: "isallowedVehicles", project_contract_vehicle_id: c }
            );
        },
    }
}
</script>
<style scoped lang="scss">
::v-deep.el-collapse-item__header {
    padding-left: 1.5rem;
}

::v-deep.el-table th.el-table__cell>.cell {
    color: #212529;
    font-size: 1rem;
    word-break: break-word;
}

::v-deep.el-table__row .el-input .el-input__inner {
    border-style: none;
    font-size: 16px !important;
}

::v-deep.el-table {
    .el-input__inner {
        font-size: 16px !important;
    }
}
</style>