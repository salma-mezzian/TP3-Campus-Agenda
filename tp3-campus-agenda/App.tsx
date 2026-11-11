
import React from 'react';

import {  View, Text, FlatList, StyleSheet,
} from 'react-native';

type Evenement = { id: string; titre: string;categorie: string; capacite: number;
  inscrits: number;
};

const evenements: Evenement[] = [
  { id: 'E01', titre: 'Atelier React', categorie: 'Atelier', capacite: 25,
 inscrits: 25, },

  { id: 'E02', titre: 'Conférence IA', categorie: 'Conférence', capacite: 70,
    inscrits: 52,
  },
  { id: 'E03', titre: 'Sécurité mobile',
    categorie: 'Atelier', capacite: 20, inscrits: 17,
  },
  { id: 'E04', titre: 'Design UI',  categorie: 'Atelier',  capacite: 18, inscrits: 9,
  },
  { id: 'E05', titre: 'Forum projets', categorie: 'Rencontre',capacite: 50,
    inscrits: 49, },
  { id: 'E06', titre: 'Découverte Git', categorie: 'Atelier', capacite: 24,
    inscrits: 24, },
];

function placesRestantes(e: Evenement): number {
  return Math.max(0, e.capacite - e.inscrits); }

function statutEvenement(e: Evenement): string {const places = placesRestantes(e);

  if (places === 0) {
    return 'Complet';
  } else if (places <= 3) {
    return 'Presque complet';
  } else {
    return 'Ouvert';
  }
}

const nombreEvenements = evenements.length;

const nombreComplets = evenements.filter( e => placesRestantes(e) === 0
).length;

const nombreAvecPlaces = evenements.filter(
  e => placesRestantes(e) > 0
).length;

const totalPlaces = evenements.reduce(
  (somme, e) => somme + placesRestantes(e), 0 );

const ateliersDisponibles = evenements.filter( e => e.categorie === 'Atelier' && placesRestantes(e) > 0
);

type BadgeProps = { statut: string;};

function BadgeEtat({ statut }: BadgeProps) {let couleur = styles.badgeOuvert;
 if (statut === 'Complet') {
    couleur = styles.badgeComplet; } 
    else if (statut === 'Presque complet') {
    couleur = styles.badgePresque; }

  return (
    <Text style={[styles.badge, couleur]}>
      {statut}
    </Text> );
}

type CarteProps = { evenement: Evenement; };

function CarteEvenement({ evenement }: CarteProps) { const places = placesRestantes(evenement);
  const statut = statutEvenement(evenement);
return (
    <View style={styles.carte}>
      <Text style={styles.titreCarte}> {evenement.titre}
      </Text>

   <BadgeEtat statut={statut} />

      <Text style={styles.texteCarte}>
        Catégorie : {evenement.categorie}
      </Text>

   <Text style={styles.texteCarte}>
        Places restantes : {places}
      </Text>
    </View>
  );
}

type StatistiqueProps = {label: string;
 valeur: number;
};

function BlocStatistique({ label, valeur }: StatistiqueProps) {
  return (
    <View style={styles.blocStat}>
    <Text style={styles.valeurStat}>
     {valeur}
      </Text>

      <Text style={styles.labelStat}>
        {label}
      </Text>
    </View> ); }

export default function App() { const mode: 'tous' | 'ateliers' = 'tous';

  const evenementsAffiches = mode === 'tous' ? evenements : ateliersDisponibles;

  return ( <View style={styles.page}>
      <Text style={styles.titrePrincipal}>
        CampusAgenda
      </Text>

      <Text style={styles.sousTitre}>  Découvrez les événements du campus </Text>

      <View style={styles.statistiques}>
        <BlocStatistique label="Total événements" valeur={nombreEvenements} />
        <BlocStatistique label="Événements complets" valeur={nombreComplets} />
        <BlocStatistique label="Avec places" valeur={nombreAvecPlaces} />
        <BlocStatistique label="Places restantes" valeur={totalPlaces} />
      </View>

      <Text style={styles.titreListe}> {mode === 'tous' ? 'Tous les événements' : 'Ateliers disponibles'}
      </Text>

      <FlatList data={evenementsAffiches}
        renderItem={({ item }) => (
          <CarteEvenement evenement={item} /> )}
        keyExtractor={item => item.id}
        ListEmptyComponent={
       <Text>Aucun événement à afficher.</Text>
        }
      />
    </View> ); }

const styles = StyleSheet.create({ page: {
    flex: 1,  backgroundColor: '#F2F7FD', paddingTop: 50,  paddingHorizontal: 18,
  },
  titrePrincipal: { fontSize: 28,
    fontWeight: 'bold', color: '#183153',
  },
  sousTitre: {  fontSize: 15,  color: '#64748B', marginBottom: 20,
  },
  statistiques: { flexDirection: 'row', flexWrap: 'wrap',justifyContent: 'space-between',
  },
  blocStat: {  width: '48%',
    backgroundColor: 'white', padding: 12, borderRadius: 12, marginBottom: 10,
    alignItems: 'center',
  },
  valeurStat: {  fontSize: 24,
    fontWeight: 'bold',
    color: '#2563EB', },
  labelStat: { fontSize: 12, color: '#64748B', textAlign: 'center',
  },
  titreListe: { fontSize: 20, fontWeight: 'bold', marginVertical: 15,
  },
  carte: { backgroundColor: 'white', padding: 16, borderRadius: 12,
    marginBottom: 12,
  },
  titreCarte: {  fontSize: 17,
    fontWeight: 'bold', marginBottom: 10,
  },
  texteCarte: { marginTop: 7, color: '#64748B',
  },
  badge: {  alignSelf: 'flex-start', padding: 6, borderRadius: 8,
    overflow: 'hidden', fontWeight: 'bold',
  },
  badgeComplet: { backgroundColor: '#FEE2E2', color: '#B91C1C', },
  badgePresque: { backgroundColor: '#FFEDD5',
    color: '#C2410C',
  },
  badgeOuvert: {
    backgroundColor: '#DCFCE7',
    color: '#15803D',
  },
});
