<template>
  <DataTable 
    :value="comments"
    :paginator="true"
    :rows="10"
    :rowsPerPageOptions="[5, 10, 20, 50]"
    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    responsiveLayout="scroll"
    class="p-datatable-striped"
  >
    <Column field="id" header="ID" :sortable="true" style="width: 80px"></Column>
    <Column field="name" header="Name" :sortable="true" style="width: 200px">
      <template #body="slotProps">
        <div class="flex align-items-center">
          <i class="pi pi-user mr-2"></i>
          {{ slotProps.data.name }}
        </div>
      </template>
    </Column>
    <Column field="email" header="Email" :sortable="true" style="width: 250px">
      <template #body="slotProps">
        <div class="flex align-items-center">
          <i class="pi pi-envelope mr-2"></i>
          {{ slotProps.data.email }}
        </div>
      </template>
    </Column>
    <Column field="body" header="Comment" :sortable="true">
      <template #body="slotProps">
        <div class="line-clamp-2">{{ slotProps.data.body }}</div>
      </template>
    </Column>
    <Column :exportable="false" style="width: 100px">
      <template #body="slotProps">
        <Button 
          icon="pi pi-pencil" 
          class="p-button-rounded p-button-text p-button-info" 
          @click="$emit('edit', slotProps.data)"
          v-tooltip="'Edit Comment'"
        />
      </template>
    </Column>
  </DataTable>
</template>

<script setup>
defineProps({
  comments: {
    type: Array,
    required: true
  }
})

defineEmits(['edit'])
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

:deep(.p-datatable) {
  border-radius: 8px;
  overflow: hidden;
}

:deep(.p-datatable .p-datatable-header) {
  background: var(--surface-section);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

:deep(.p-datatable .p-datatable-thead > tr > th) {
  background: var(--surface-section);
  color: var(--text-color);
  font-weight: 600;
  padding: 1rem;
}

:deep(.p-datatable .p-datatable-tbody > tr) {
  transition: background-color 0.2s;
}

:deep(.p-datatable .p-datatable-tbody > tr:hover) {
  background: var(--surface-hover);
}
</style> 