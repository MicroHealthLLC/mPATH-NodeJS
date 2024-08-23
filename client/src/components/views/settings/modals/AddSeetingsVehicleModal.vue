<template>
    <el-dialog :visible.sync="localVehicleDialogVisible" :before-close="closeModal" append-to-body center
        class="contractForm addVehicle p-0">
        <div class="row mb-3 mt-1">
            <div class="col-5">
                <span slot="title" class="text-left add-groups-header ">
                    <h5 class="text-dark">
                        <i class="fas fa-plus-circle mr-1 mb-3"></i>Add Existing Vehicle
                    </h5>
                </span>
            </div>
            <div class="col-7 text-right">
                <el-input type="search"
                    placeholder="Search by Vehicle Name, SINS/Subcategories, Contract Agency, or Type"
                    aria-label="Search" class="w-100" aria-describedby="search-addon"
                    v-model="localSearchContractVehiclesData" data-cy="">
                    <el-button slot="prepend" icon="el-icon-search"></el-button>
                </el-input>
            </div>
        </div>
        <template>
            <div v-loading="!contractVehiclesLoaded" element-loading-text="Fetching your data. Please wait..."
                element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"
                class="addVehicleModal">
                <el-tabs type="border-card" @tab-click="handleClick">
                    <el-tab-pane class="p-3" style="postion:relative" label="PRIME">
                        <el-table :data="allVehicles" v-if="allVehicles && allVehicles.length > 0" style="width: 100%">
                            <el-table-column prop="prime_name" label="Prime">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.prime_name">
                                        {{ scope.row.prime_name }}
                                    </span>
                                    <span v-else>
                                        MicroHealth, LLC.
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="name" label="Vehicle Nickname">
                            </el-table-column>
                            <el-table-column label="Vehicle Full Name">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.full_name">
                                        {{ scope.row.full_name }}
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="Contracting Agency">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.contract_agency &&
        scope.row.contract_agency.name !== null
        ">
                                        {{ scope.row.contract_agency.name }}
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="Vehicle Type">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.contract_vehicle_type &&
        scope.row.contract_vehicle_type.name !== null
        ">
                                        {{ scope.row.contract_vehicle_type.name }}
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="Actions" fixed="right" align="right">
                                <template slot-scope="scope">
                                    <el-button size="small" type="default" v-tooltip="`Add Vehicle`" @click.prevent="
        addExistingVehicle(scope.$index, scope.row)
        " class="bg-primary text-light btn-sm">
                                        <i class="fas fa-plus-circle"></i>
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <span class="mt-3" v-else>
                            <h4><em>There are currently no vehicles to display</em></h4>
                        </span>
                    </el-tab-pane>

                    <el-tab-pane class="p-3" style="postion:relative" label="SUBCONTRACT">
                        <el-table :data="allSubVehicles" v-if="allSubVehicles && allSubVehicles.length > 0"
                            style="width: 100%">
                            <el-table-column prop="subprime_name" label="Subcontract Prime">
                            </el-table-column>
                            <el-table-column prop="name" label="Vehicle Nickname">
                            </el-table-column>
                            <el-table-column label="Contract Name">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.contract_name">
                                        {{ scope.row.contract_name }}
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="Vehicle Full Name">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.full_name">
                                        {{ scope.row.full_name }}
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="Contracting Agency">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.contract_agency &&
        scope.row.contract_agency.name !== null
        ">
                                        {{ scope.row.contract_agency.name }}
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="Vehicle Type">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.contract_vehicle_type &&
        scope.row.contract_vehicle_type.name !== null
        ">
                                        {{ scope.row.contract_vehicle_type.name }}
                                    </span>
                                </template>
                            </el-table-column>
                            <el-table-column label="Actions" fixed="right">
                                <template slot-scope="scope">
                                    <el-button size="small" type="default" v-tooltip="`Add Vehicle`" @click.prevent="
        addExistingVehicle(scope.$index, scope.row)
        " class="bg-primary text-light btn-sm">
                                        <i class="fas fa-plus-circle"></i>
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <span class="mt-3" v-else>
                            <h4><em>There are currently no vehicles to display</em></h4>
                        </span>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </template>
    </el-dialog>
</template>
<script>
export default {
    name: 'AddSettingsVehicleModal',
    props: ['vehicleDialogVisible', 'searchContractVehiclesData', 'allVehicles', 'contractVehiclesLoaded', 'allSubVehicles'],
    data(){
        return {
            localVehicleDialogVisible: false,
            localSearchContractVehiclesData: ''
        }
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab);
            console.log(`${("event:", event)}`);
        },
        closeModal(){
            this.$emit('closeModal');
        },
        addExistingVehicle(index,rowData){
            this.$emit('addExistingVehicle',index,rowData)
        }
    },
    watch: {
        vehicleDialogVisible(newVal){
            this.localVehicleDialogVisible = newVal
        },
        localSearchContractVehiclesData(newVal){
            this.$emit('setSearchContractVehiclesData', newVal)
        }

    }
}
</script>
