<template>
    <el-dialog :visible.sync="localContractDialogVisible" :before-close="closeSettingsModal" append-to-body center
        class="contractForm addContract p-0">
        <div class="row mb-3 mt-1">
            <div class="col-7">
                <span slot="title" class="text-left add-groups-header ">
                    <h5 class="text-dark"> <i class="far fa-plus-circle mr-1 mb-3"></i>Add Exisiting Contract </h5>
                </span>
            </div>
            <div class="col-5 text-right">
                <el-input type="search" placeholder="Search by Project Name, Customer or Contract #" aria-label="Search"
                    class="w-100" aria-describedby="search-addon" v-model="localSearchContractData" data-cy="">
                    <el-button slot="prepend" icon="el-icon-search"></el-button>
                </el-input>
            </div>
        </div>
        <template>
            <div v-loading="!contractProjectsLoaded" element-loading-text="Fetching your data. Please wait..."
                element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"
                class="addContractModal">
                <el-table :data="allContracts" v-if="allContracts && allContracts.length > 0" style="width: 100%">
                    <el-table-column prop="name" label="Project Name" width="180">
                    </el-table-column>
                    <el-table-column label="Customer" width="200" prop="contract_customer_id">
                        <template slot-scope="scope">
                            <span v-if="(scope.row.contract_customer && scope.row.contract_customer.name !== null)">
                                {{ scope.row.contract_customer.name }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="Contract Number" width="200" prop="contract_number_id">
                        <template slot-scope="scope">
                            <span v-if="scope.row.contract_number && scope.row.contract_number.name !== null">
                                {{ scope.row.contract_number.name }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="Award/ TO Number" width="200" prop="contract_award_to_id">
                        <template slot-scope="scope">
                            <span v-if="scope.row.contract_award_to && scope.row.contract_award_to.name !== null">
                                {{ scope.row.contract_award_to.name }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="Actions" align="right">
                        <template slot-scope="scope">
                            <el-button type="default" data-cy="add_contract_btn" v-tooltip="`Add Contract`"
                                @click.prevent="addExistingContract(scope.$index, scope.row)"
                                class="bg-primary text-light btn-sm">
                                <i class="far fa-plus-circle"></i>
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <span class="mt-3" v-else>
                    <h4><em>There are currently no contracts to display</em></h4>
                </span>
            </div>
        </template>

    </el-dialog>
</template>
<script>
export default {
    name: 'AddSettingsContractModal',
    props: ['contractDialogVisible', 'searchContractData', 'allContracts', 'contractProjectsLoaded'],
    data() {
        return {
            localContractDialogVisible: this.contractDialogVisible,
            localSearchContractData: this.searchContractData
        }
    },
    methods: {
        addExistingContract(index, rowData) {
            this.$emit('addExistingContract', index, rowData);
        },
        closeSettingsModal() {
            this.$emit('closeAddSettingsContractModal')
        }
    },
    watch: {
        contractDialogVisible(newVal) {
            this.localContractDialogVisible = newVal;
        },
        localSearchContractData(newVal) {
            this.$emit('setSearchContract', newVal)
        }
    }
}
</script>