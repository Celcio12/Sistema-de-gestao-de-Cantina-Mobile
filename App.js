import React from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, Platform, Text } from 'react-native';
import { WebView } from 'react-native-webview';

export default function App() {
  // CONFIGURAÇÃO DE URL:
  // 1. Para desenvolvimento local: Use o IP do seu computador (ex: 'http://192.168.1.10:3000')
  // 2. Para produção: Use o link do Vercel
  const isDevelopment = __DEV__;
  const localUrl = 'http://192.168.132.250:5173'; 
  const productionUrl = 'https://sistema-cantina.vercel.app';
  
  const siteUrl = isDevelopment ? localUrl : productionUrl;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.webviewContainer}>
        <WebView 
          source={{ uri: siteUrl }}
          style={styles.webview}
          startInLoadingState={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn('WebView error: ', nativeEvent);
          }}
          renderError={() => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
              <View style={{ backgroundColor: '#fee2e2', padding: 20, borderRadius: 10 }}>
                <View style={{ alignItems: 'center', marginBottom: 10 }}>
                  <StatusBar barStyle="dark-content" />
                  <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#ef4444', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: 20, height: 3, backgroundColor: 'white', transform: [{ rotate: '45deg' }] }} />
                    <View style={{ width: 20, height: 3, backgroundColor: 'white', transform: [{ rotate: '-45deg' }], marginTop: -3 }} />
                  </View>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <View style={{ marginBottom: 5 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#b91c1c' }}>Erro de Conexão</Text>
                  </View>
                  <Text style={{ textAlign: 'center', color: '#7f1d1d' }}>
                    Não foi possível carregar o sistema em:{"\n"}{siteUrl}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  webviewContainer: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
