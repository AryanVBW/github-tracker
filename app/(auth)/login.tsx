import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  Pressable,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

WebBrowser.maybeCompleteAuthSession();

const { width } = Dimensions.get('window');
const GITHUB_CLIENT_ID = process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID;

export default function Login() {
  const [manualToken, setManualToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleGitHubAuth = async () => {
    try {
      const redirectUri = AuthSession.makeRedirectUri();
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${redirectUri}&scope=repo,user`;
      
      const result = await AuthSession.startAsync({ authUrl });

      if (result.type === 'success') {
        router.replace('/(tabs)');
      }
    } catch (error) {
      setError('Authentication failed. Please try manual token input.');
      setShowTokenInput(true);
    }
  };

  const handleManualTokenSubmit = () => {
    if (manualToken.length < 40) {
      setError('Please enter a valid GitHub token');
      return;
    }
    // Here you would validate the token with GitHub API
    router.replace('/(tabs)');
  };

  const Button = Platform.select({
    web: ({ children, onClick, style, variant = 'primary' }) => (
      <button
        onClick={onClick}
        style={{
          ...style,
          border: 'none',
          cursor: 'pointer',
          padding: '16px 32px',
          borderRadius: '8px',
          width: '100%',
          maxWidth: '300px',
          backgroundColor: variant === 'primary' ? '#2ea043' : '#30363d',
          color: '#fff',
          fontSize: '16px',
          fontWeight: '600',
          textAlign: 'center',
          outline: 'none',
          transition: 'transform 0.2s, background-color 0.2s',
          ':hover': {
            transform: 'translateY(-2px)',
            backgroundColor: variant === 'primary' ? '#2c974b' : '#3c444d',
          }
        }}
      >
        {children}
      </button>
    ),
    default: ({ children, onPress, style, variant = 'primary' }) => (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.button,
          variant === 'secondary' && styles.buttonSecondary,
          pressed && styles.buttonPressed,
          style,
        ]}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    ),
  });

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <LinearGradient
        colors={['#0d1117', '#161b22']}
        style={styles.container}
      >
        <View style={styles.glowCircle} />
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <View style={styles.logoGlow} />
            <Ionicons name="git-branch" size={64} color="#58a6ff" />
          </View>

          <Text style={styles.title}>GitHub College Tracker</Text>
          <Text style={styles.subtitle}>Track and compare GitHub contributions with your college peers</Text>

          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : null}

          {!showTokenInput ? (
            <Button
              onClick={handleGitHubAuth}
              onPress={handleGitHubAuth}
              style={styles.githubButton}
            >
              <View style={styles.buttonContent}>
                <Ionicons name="logo-github" size={24} color="#fff" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Continue with GitHub</Text>
              </View>
            </Button>
          ) : (
            <View style={styles.tokenInputContainer}>
              <Text style={styles.tokenInstructions}>
                1. Go to GitHub Settings → Developer Settings → Personal Access Tokens
                {'\n'}2. Generate a new token with 'repo' and 'user' scopes
                {'\n'}3. Copy and paste your token below
              </Text>
              <TextInput
                style={styles.tokenInput}
                placeholder="Paste your GitHub token"
                placeholderTextColor="#8b949e"
                value={manualToken}
                onChangeText={setManualToken}
                secureTextEntry
              />
              <Button
                onClick={handleManualTokenSubmit}
                onPress={handleManualTokenSubmit}
                style={styles.submitButton}
              >
                Submit Token
              </Button>
            </View>
          )}

          {!showTokenInput && (
            <Button
              onClick={() => setShowTokenInput(true)}
              onPress={() => setShowTokenInput(true)}
              variant="secondary"
              style={styles.manualButton}
            >
              Enter Token Manually
            </Button>
          )}
        </View>

        <View style={styles.gridBackground}>
          {Array.from({ length: 20 }).map((_, i) => (
            <View key={i} style={styles.gridLine} />
          ))}
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    zIndex: 2,
  },
  logoContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  logoGlow: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#58a6ff33',
    transform: [{ scale: 1.5 }],
  },
  glowCircle: {
    position: 'absolute',
    width: width * 2,
    height: width * 2,
    borderRadius: width,
    backgroundColor: '#58a6ff0a',
    top: -width,
    left: -width / 2,
    zIndex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#8b949e',
    textAlign: 'center',
    marginBottom: 32,
    maxWidth: 300,
  },
  button: {
    backgroundColor: '#2ea043',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: '#30363d',
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  manualButton: {
    marginTop: 16,
  },
  tokenInputContainer: {
    width: '100%',
    maxWidth: 300,
  },
  tokenInstructions: {
    color: '#8b949e',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  tokenInput: {
    backgroundColor: '#21262d',
    borderRadius: 8,
    padding: 16,
    color: '#fff',
    marginBottom: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: '#30363d',
  },
  submitButton: {
    marginTop: 8,
  },
  errorText: {
    color: '#f85149',
    marginBottom: 16,
    textAlign: 'center',
  },
  gridBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
  },
  gridLine: {
    position: 'absolute',
    backgroundColor: '#30363d',
    width: 1,
    height: '200%',
    transform: [{ rotate: '45deg' }],
    left: (index) => `${(index / 20) * 100}%`,
  },
});