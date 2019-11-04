<template>
 <template v-if="showPanel">
            <v-card-text>
              <div v-if="Object.keys(featureInfo).length !== 0 && featureInfo.constructor === Object" class="overlayWrapper">
                
                {{featureInfo.features[0].id}}
               
                  <ul>
                    <li v-for="k in Object.keys(featureInfo.features[0].properties)" :key="k">
                      {{ k }} : {{ featureInfo.features[0].properties[k] }}
                    </li>
                  </ul>
                </div>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn small @click="panelButton">Click me</v-btn>
              </v-card-actions></v-card-text
            >
          </template>
</template

