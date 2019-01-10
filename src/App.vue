<template>
  <VApp>
    <VNavigationDrawer
      absolute
      overflow
      permanent
      app
    >
      <VList dense>
        <VListTile
          :to="{ name: 'myself' }"
          avatar
        >
          <VListTileAvatar> <VIcon>directions_run</VIcon> </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle v-if="me">
              {{ me.name }}
            </VListTileTitle>
          </VListTileContent>
        </VListTile>
      </VList>
      <VList dense>
        <RecursiveNavBar
          v-for="n in nodes"
          :key="n.header"
          :actions="n.actions"
          :header="n.header"
          :node="n.node"
        />
      </VList>
    </VNavigationDrawer>
    <VToolbar
      app
      dark
      flat
    >
      <VSpacer />
      <VToolbarTitle>Application</VToolbarTitle>
    </VToolbar>
    <VContent>
      <VContainer fluid>
        <RouterView />
      </VContainer>
    </VContent>
  </VApp>
</template>

<script src="@/app.ts" type="ts"></script>
