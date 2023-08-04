<template>
  <q-btn-dropdown class="row items-center" unelevated color="primary" square dense>
    <template #label>
      <div class="text-left q-ml-xs" style="width: 192px">
        <q-icon class="float-left" name="face" left size="xl" />
        <span>Welcome</span>

        <div class="text-overflow-ellipsis">
          <span>YONG CHI MIN</span>
          <q-tooltip>YONG CHI MIN</q-tooltip>
        </div>
      </div>
    </template>

    <q-list dense>
      <q-item class="text-negative" clickable v-close-popup>
        <q-item-section avatar>
          <q-avatar icon="logout" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Logout</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>
