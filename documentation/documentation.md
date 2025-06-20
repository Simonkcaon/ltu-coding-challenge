

Anfang ca. 2:05
Nutzung: Cursor

1. 
Fehleranalyse: 

React Native Dev Tools, Network untersucht, keine Probleme festgestellt. 

App Struktur gesichtet App.tsx und getNotesService und NotesListScreen überprüft.  

NotesListScreen einfach nur ein LTU Spinner, aber ohne funktion wann der Spinner angezeigt werden soll und wann nicht.

Added Nodes fetching logic from App.tsx
Found API_Key authMode issue, we dont use API_Key so removed it.

Cursor gefragt den Case zu handeln wenn keine Notes vorhanden sind (was momentan so ist)

----------------------------------
2.

Cursor nach projektstruktur gefragt: 

ltu-coding-challenge/
├── amplify/              # AWS Amplify backend configuration
│   └── backend/
│       ├── api/          # GraphQL API definition (schema.graphql)
│       └── auth/         # Cognito User Pool configuration
├── src/                  # Main application source code
│   ├── API.ts            # Auto-generated TypeScript types for your GraphQL API
│   ├── components/       # Reusable UI components
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Icon/
│   │   ├── Input/
│   │   ├── Spinner/
│   │   └── typography/   # (Headline, Label, Text, Title)
│   ├── constants/        # Shared values like colors (colors.ts)
│   ├── context/          # React Context for global state management
│   │   └── AppContext.tsx # Central app store for notes, auth status, etc.
│   ├── graphql/          # GraphQL queries, mutations, and subscriptions
│   ├── navigation/       # React Navigation setup
│   │   ├── ArchiveStack.tsx  <- STALE
│   │   ├── NotesStack.tsx
│   │   ├── RootNavigator.tsx
│   │   └── TabsNavigator.tsx
│   ├── services/         # Services for interacting with the backend
│   │   ├── createNoteService.ts <- STALE
│   │   └── getNotesService.ts
│   ├── types/            # Custom TypeScript types for the app
│   └── views/            # Application screens
│       ├── LoginScreen.tsx
│       ├── LogoutScreen.tsx
│       ├── NotesListScreen.tsx
│       └── UserAuthenticated.tsx
├── App.tsx               # The main entry point of the application
└── package.json          # Project dependencies and scripts

Asked  Cursor for documentation  of expo headerRight option
Implemented it with LTU Icons. 
Asked cursor for explanation about Ionicons, bisher immer mit FontAwesome gearbeitet. 
-> Best practice von der Ionicon documnetation zusammenfassen lassen. 
-> commit message von cursor verfasst

Cursor CreateNotes
CreateNotesScreen Grundstruktur durch Cursor

End of 2. Commit Message von Cursor 

3. Archive 

Created all the files manually,
Gave a rough implemenation of the animation and then let cursor handle the bugs "depreceated swipeable" 

Used cursor autocompletion to finish some Tasks quicker while writing the code. 

Used cursor to adapt similar structures: 
getNotesService -> UpdateNoteServce
ScreenNotesListScreen -> ArchivedNotes

4. 


