# Integrasjonsguide

## PocketBase Oppsett

1. Last ned og installer PocketBase
2. Opprett følgende collections:
   - users
   - stories
   - characters
   - series

## OpenAI Integrasjon

1. Opprett en API-nøkkel på OpenAI
2. Konfigurer miljøvariabler:
   ```env
   VITE_OPENAI_API_KEY=your_key
   ```
3. Implementer historiegenerering:
   ```typescript
   import { Configuration, OpenAIApi } from 'openai';
   
   const openai = new OpenAIApi(new Configuration({
     apiKey: import.meta.env.VITE_OPENAI_API_KEY
   }));
   ```

## Print-on-demand Integrasjon

1. Registrer deg hos print-leverandør
2. Implementer bestillingsflyt:
   ```typescript
   async function createPrintOrder(storyId: string, options: PrintOptions) {
     // Implementation
   }
   ```

## Text-to-Speech

1. Konfigurer AWS Polly:
   ```typescript
   import AWS from 'aws-sdk';
   
   const polly = new AWS.Polly({
     region: import.meta.env.VITE_AWS_REGION,
     credentials: {
       accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
       secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY
     }
   });
   ```

## Medielagring

1. Opprett en S3 bucket
2. Konfigurer CORS
3. Implementer opplasting:
   ```typescript
   async function uploadMedia(file: File) {
     // Implementation
   }
   ```