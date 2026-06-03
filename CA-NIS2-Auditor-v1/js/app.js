/* ═══════════════════════════════════════════════════════
   CA NIS2 Auditor
   CyberAtaraxia — Selim JERBI
   app.js
   ═══════════════════════════════════════════════════════ */


// Logo: SVG inline (no external image needed)
// =====================================================
// CLÉ API OPENAI — Remplacez la valeur ci-dessous
// dans un éditeur texte (Bloc-notes).
// Obtenez une clé sur : https://platform.openai.com
// =====================================================
const HARDCODED_API_KEY = "VOTRE_CLE_OPENAI_ICI";

const THEMES = [{"letter": "A", "name": "Gouvernance & Politique", "summary": "L'organisation dispose-t-elle d'une politique de sécurité formalisée, validée par la direction, et revue régulièrement ?", "why": "Sans politique de sécurité écrite et approuvée, la cybersécurité repose sur des habitudes individuelles. Cela crée des incohérences et expose l'entreprise en cas de contrôle ou d'incident.", "questions": [{"text": "Une politique de sécurité informatique écrite existe-t-elle dans votre entreprise ?", "sub": "Document décrivant les règles, responsabilités et engagements en matière de cybersécurité.", "opts": [{"label": "Non", "desc": "Aucun document n'existe", "score": 0}, {"label": "Partiel", "desc": "Des règles existent mais ne sont pas formalisées par écrit", "score": 1}, {"label": "Oui", "desc": "Une politique écrite existe, validée par la direction et accessible à tous", "score": 2}]}, {"text": "Cette politique est-elle revue et mise à jour régulièrement ?", "sub": "Ex : révision annuelle après un incident, après un changement organisationnel ou technologique.", "opts": [{"label": "Non", "desc": "Elle n'a jamais été revue depuis sa création", "score": 0}, {"label": "Partiel", "desc": "Elle est revue occasionnellement, sans calendrier défini", "score": 1}, {"label": "Oui", "desc": "Elle est revue au minimum une fois par an ou après tout incident majeur", "score": 2}]}, {"text": "La direction est-elle formellement impliquée dans les décisions de cybersécurité ?", "sub": "Ex : approbation des budgets, validation des règles, sponsor identifié.", "opts": [{"label": "Non", "desc": "La cybersécurité est uniquement gérée par l'informatique sans implication de la direction", "score": 0}, {"label": "Partiel", "desc": "La direction est informée ponctuellement mais n'est pas formellement impliquée", "score": 1}, {"label": "Oui", "desc": "La direction valide les décisions clés et un responsable est clairement désigné", "score": 2}]}, {"text": "Des rôles et responsabilités en matière de cybersécurité sont-ils clairement définis ?", "sub": "Ex : qui est responsable de la sécurité, qui gère les incidents, qui décide des accès.", "opts": [{"label": "Non", "desc": "Pas de responsabilités définies, chacun fait comme il peut", "score": 0}, {"label": "Partiel", "desc": "Des responsabilités informelles existent mais ne sont pas documentées", "score": 1}, {"label": "Oui", "desc": "Les rôles sont documentés, communiqués et acceptés par les personnes concernées", "score": 2}]}, {"text": "Les règles de sécurité sont-elles communiquées à l'ensemble des employés ?", "sub": "Ex : affichage des règles en interne, email récapitulatif annuel, réunion de sensibilisation.", "opts": [{"label": "Non", "desc": "Les employés ne sont pas informés des règles de sécurité", "score": 0}, {"label": "Partiel", "desc": "Certains employés sont informés ou uniquement à l'embauche", "score": 1}, {"label": "Oui", "desc": "Tous les employés reçoivent et accusent réception des règles, régulièrement rappelées", "score": 2}]}, {"text": "Existe-t-il une procédure de gestion des exceptions à la politique de sécurité ?", "sub": "Ex : un employé demande à contourner une règle pour des raisons métier.", "opts": [{"label": "Non", "desc": "Les exceptions ne sont pas encadrées", "score": 0}, {"label": "Partiel", "desc": "Les exceptions sont accordées au cas par cas sans formalisme", "score": 1}, {"label": "Oui", "desc": "Un processus formel d'approbation et de suivi des exceptions existe", "score": 2}]}, {"text": "Un audit ou une revue interne de la sécurité est-il réalisé périodiquement ?", "sub": "Ex : vérification annuelle du respect des règles, contrôle des accès actifs, test des sauvegardes.", "opts": [{"label": "Non", "desc": "Aucune revue n'est organisée", "score": 0}, {"label": "Partiel", "desc": "Des vérifications ponctuelles existent mais sans structure ni calendrier", "score": 1}, {"label": "Oui", "desc": "Des audits internes sont planifiés et documentés au moins une fois par an", "score": 2}]}, {"text": "La conformité légale et réglementaire (RGPD, NIS2, etc.) est-elle intégrée dans la politique ?", "sub": "Ex : mention explicite du RGPD, de NIS2 ou de la loi belge sur la protection des données dans le document.", "opts": [{"label": "Non", "desc": "Les obligations légales ne sont pas prises en compte", "score": 0}, {"label": "Partiel", "desc": "Certaines exigences sont connues mais non intégrées formellement", "score": 1}, {"label": "Oui", "desc": "La politique intègre explicitement les obligations réglementaires applicables", "score": 2}]}, {"text": "Les contrats de travail ou chartes incluent-ils des clauses de sécurité informatique ?", "sub": "Ex : obligation de confidentialité, interdiction d'usage non autorisé des systèmes.", "opts": [{"label": "Non", "desc": "Aucune clause de sécurité dans les contrats", "score": 0}, {"label": "Partiel", "desc": "Des clauses existent pour certains postes ou contrats", "score": 1}, {"label": "Oui", "desc": "Tous les contrats et chartes incluent des clauses de sécurité claires", "score": 2}]}, {"text": "Des indicateurs de suivi de la sécurité sont-ils définis et suivis par la direction ?", "sub": "Ex : nombre d'incidents, taux de mise à jour, taux de formation des employés.", "opts": [{"label": "Non", "desc": "Aucun indicateur de sécurité n'est suivi", "score": 0}, {"label": "Partiel", "desc": "Quelques indicateurs informels sont suivis sporadiquement", "score": 1}, {"label": "Oui", "desc": "Des KPIs sécurité sont définis, mesurés et présentés à la direction régulièrement", "score": 2}]}]}, {"letter": "B", "name": "Gestion des risques", "summary": "L'entreprise dispose-t-elle d'un processus structuré pour identifier, évaluer et traiter les risques cyber qui pèsent sur son activité ?", "why": "Sans analyse de risques, les investissements sécurité sont faits à l'aveugle. Un processus structuré permet de prioriser les actions là où l'impact serait le plus grave pour l'entreprise.", "questions": [{"text": "Une analyse des risques informatiques a-t-elle été réalisée ?", "sub": "Identification des menaces, vulnérabilités et impacts potentiels sur l'activité.", "opts": [{"label": "Non", "desc": "Aucune analyse de risques n'a jamais été faite", "score": 0}, {"label": "Partiel", "desc": "Une réflexion informelle a eu lieu mais sans méthode ni documentation", "score": 1}, {"label": "Oui", "desc": "Une analyse formelle et documentée a été réalisée selon une méthode reconnue", "score": 2}]}, {"text": "Les risques identifiés sont-ils documentés dans un registre ou tableau de bord des risques ?", "sub": "Ex : tableau Excel des risques, outil dédié (registre des risques), document partagé avec la direction.", "opts": [{"label": "Non", "desc": "Aucun document de suivi des risques", "score": 0}, {"label": "Partiel", "desc": "Quelques risques sont notés mais sans suivi structuré", "score": 1}, {"label": "Oui", "desc": "Un registre des risques formalisé est maintenu et mis à jour", "score": 2}]}, {"text": "Un plan de traitement des risques identifiés existe-t-il ?", "sub": "Actions concrètes pour réduire, transférer ou accepter chaque risque.", "opts": [{"label": "Non", "desc": "Aucun plan d'action lié aux risques", "score": 0}, {"label": "Partiel", "desc": "Des actions sont prévues pour certains risques mais non formalisées", "score": 1}, {"label": "Oui", "desc": "Un plan d'action formalisé existe avec responsables et délais pour chaque risque", "score": 2}]}, {"text": "Les risques sont-ils évalués selon leur probabilité et leur impact potentiel ?", "sub": "Ex : matrice 3x3 ou 5x5 avec score de criticité, priorisation des risques selon leur impact sur l'activité.", "opts": [{"label": "Non", "desc": "Les risques ne sont pas évalués ou priorisés", "score": 0}, {"label": "Partiel", "desc": "Une évaluation approximative existe sans méthodologie claire", "score": 1}, {"label": "Oui", "desc": "Une grille d'évaluation probabilité/impact est utilisée et documentée", "score": 2}]}, {"text": "L'analyse de risques est-elle revue régulièrement ou après un changement majeur ?", "sub": "Ex : nouveau logiciel, déménagement, changement de prestataire, incident.", "opts": [{"label": "Non", "desc": "L'analyse n'est jamais mise à jour", "score": 0}, {"label": "Partiel", "desc": "Elle est revue ponctuellement sans déclencheur défini", "score": 1}, {"label": "Oui", "desc": "Elle est revue selon un calendrier et systématiquement après tout changement significatif", "score": 2}]}, {"text": "Les risques liés aux outils numériques sont-ils évalués avant leur adoption ?", "sub": "Ex : avant d'adopter un logiciel SaaS, un service cloud, un outil de collaboration.", "opts": [{"label": "Non", "desc": "Aucune évaluation de sécurité avant adoption d'un outil", "score": 0}, {"label": "Partiel", "desc": "Une réflexion informelle est faite pour certains outils importants", "score": 1}, {"label": "Oui", "desc": "Un processus d'évaluation de sécurité est systématiquement appliqué avant toute adoption", "score": 2}]}, {"text": "Les risques liés au télétravail et aux accès distants sont-ils pris en compte ?", "sub": "Ex : VPN obligatoire, chiffrement du disque dur du portable, politique d'utilisation des réseaux Wi-Fi publics.", "opts": [{"label": "Non", "desc": "Cette dimension n'est pas considérée", "score": 0}, {"label": "Partiel", "desc": "Quelques mesures existent mais sans analyse formelle du risque", "score": 1}, {"label": "Oui", "desc": "Les risques liés au télétravail sont documentés et des mesures adaptées sont en place", "score": 2}]}, {"text": "Les risques liés aux personnes (erreur humaine, malveillance interne) sont-ils analysés ?", "sub": "Ex : risque d'erreur de manipulation, accès abusif par un employé mécontent, ingénierie sociale.", "opts": [{"label": "Non", "desc": "Seuls les risques techniques sont considérés", "score": 0}, {"label": "Partiel", "desc": "Les risques humains sont évoqués sans analyse formelle", "score": 1}, {"label": "Oui", "desc": "Les risques humains sont intégrés dans l'analyse avec des mesures dédiées", "score": 2}]}, {"text": "Existe-t-il un responsable clairement identifié pour la gestion des risques ?", "sub": "Ex : responsable IT désigné, RSSI (Responsable Sécurité des SI), ou direction assumant ce rôle formellement.", "opts": [{"label": "Non", "desc": "Personne n'est formellement responsable", "score": 0}, {"label": "Partiel", "desc": "Une personne s'en occupe de façon informelle en plus de ses autres tâches", "score": 1}, {"label": "Oui", "desc": "Un responsable est officiellement désigné avec du temps alloué à cette mission", "score": 2}]}, {"text": "L'entreprise souscrit-elle une assurance cyber ?", "sub": "Couverture en cas de cyberattaque, ransomware, violation de données.", "opts": [{"label": "Non", "desc": "Aucune assurance cyber", "score": 0}, {"label": "Partiel", "desc": "Une couverture existe mais sa portée cyber n'est pas clairement définie", "score": 1}, {"label": "Oui", "desc": "Une assurance cyber dédiée est en place et ses garanties sont connues", "score": 2}]}]}, {"letter": "C", "name": "Incidents & Notification", "summary": "L'organisation est-elle en mesure de détecter un incident de sécurité, de le gérer efficacement et de le notifier aux autorités compétentes dans les délais requis ?", "why": "NIS2 impose une notification au CCB dans les 24h pour les incidents significatifs. Sans procédure établie, ce délai est impossible à tenir et expose l'entreprise à des sanctions.", "questions": [{"text": "Existe-t-il une définition claire de ce qu'est un incident de sécurité dans votre entreprise ?", "sub": "Ex : accès non autorisé, fuite de données, ransomware, indisponibilité prolongée.", "opts": [{"label": "Non", "desc": "Aucune définition — chacun interprète à sa façon", "score": 0}, {"label": "Partiel", "desc": "Une compréhension informelle existe sans document de référence", "score": 1}, {"label": "Oui", "desc": "Une définition formelle et des exemples concrets sont documentés et connus", "score": 2}]}, {"text": "Une procédure de gestion des incidents de sécurité est-elle documentée ?", "sub": "Qui prévenir, dans quel ordre, quoi faire, comment documenter.", "opts": [{"label": "Non", "desc": "Aucune procédure", "score": 0}, {"label": "Partiel", "desc": "Des réflexes informels existent mais rien n'est écrit", "score": 1}, {"label": "Oui", "desc": "Une procédure complète est documentée, accessible et connue des équipes", "score": 2}]}, {"text": "Un point de contact unique est-il désigné pour coordonner la réponse aux incidents ?", "sub": "Ex : responsable IT, directeur, ou toute personne formellement désignée comme coordinateur incidents.", "opts": [{"label": "Non", "desc": "Pas de responsable désigné", "score": 0}, {"label": "Partiel", "desc": "Une personne s'en occupe généralement mais sans désignation officielle", "score": 1}, {"label": "Oui", "desc": "Un responsable incidents est officiellement désigné avec un suppléant identifié", "score": 2}]}, {"text": "Les incidents passés ont-ils été documentés et analysés ?", "sub": "Ex : date, nature de l'incident, systèmes touchés, actions menées, durée d'interruption, leçons tirées.", "opts": [{"label": "Non", "desc": "Les incidents ne sont pas tracés", "score": 0}, {"label": "Partiel", "desc": "Les incidents majeurs sont notés mais sans analyse systématique", "score": 1}, {"label": "Oui", "desc": "Tous les incidents sont enregistrés dans un registre et analysés pour éviter la récurrence", "score": 2}]}, {"text": "Un registre des incidents est-il tenu à jour ?", "sub": "Date, nature, impact, actions prises, leçons apprises.", "opts": [{"label": "Non", "desc": "Aucun registre", "score": 0}, {"label": "Partiel", "desc": "Certains incidents sont notés de façon non structurée", "score": 1}, {"label": "Oui", "desc": "Un registre structuré est maintenu et régulièrement consulté", "score": 2}]}, {"text": "L'entreprise connaît-elle ses obligations de notification en cas d'incident (CCB, APD, clients) ?", "sub": "CCB = Centre for Cybersecurity Belgium / APD = Autorité de protection des données.", "opts": [{"label": "Non", "desc": "Ces obligations sont inconnues", "score": 0}, {"label": "Partiel", "desc": "Une conscience vague existe sans procédure claire", "score": 1}, {"label": "Oui", "desc": "Les obligations sont connues, les contacts identifiés et une procédure de notification existe", "score": 2}]}, {"text": "Des outils de détection d'incidents sont-ils en place ?", "sub": "Ex : antivirus avec alertes, système de logs, alertes de connexion inhabituelle.", "opts": [{"label": "Non", "desc": "Aucun outil de détection", "score": 0}, {"label": "Partiel", "desc": "Des outils basiques existent mais sans surveillance active", "score": 1}, {"label": "Oui", "desc": "Des outils de détection sont en place et leurs alertes sont activement surveillées", "score": 2}]}, {"text": "Les employés savent-ils quoi faire et qui prévenir s'ils suspectent un incident ?", "sub": "Ex : numéro à appeler, messagerie dédiée, procédure affichée dans les locaux ou accessible sur l'intranet.", "opts": [{"label": "Non", "desc": "Les employés ne savent pas comment réagir", "score": 0}, {"label": "Partiel", "desc": "Certains employés ont une idée mais ce n'est pas formalisé", "score": 1}, {"label": "Oui", "desc": "Tous les employés connaissent la procédure et les contacts à alerter", "score": 2}]}, {"text": "La procédure de gestion des incidents est-elle testée régulièrement ?", "sub": "Ex : simulation de crise, exercice tabletop, test de notification.", "opts": [{"label": "Non", "desc": "Jamais testé", "score": 0}, {"label": "Partiel", "desc": "Un test ponctuel a été réalisé sans suivi régulier", "score": 1}, {"label": "Oui", "desc": "Des exercices réguliers sont organisés et les résultats servent à améliorer la procédure", "score": 2}]}, {"text": "Des leçons sont-elles tirées de chaque incident pour améliorer les pratiques ?", "sub": "Ex : réunion post-incident, rapport de retour d'expérience (REX), mise à jour de la procédure de gestion.", "opts": [{"label": "Non", "desc": "Les incidents sont gérés mais pas analysés", "score": 0}, {"label": "Partiel", "desc": "Des discussions informelles ont lieu après les incidents majeurs", "score": 1}, {"label": "Oui", "desc": "Un bilan post-incident formalisé est systématiquement réalisé avec un plan d'amélioration", "score": 2}]}]}, {"letter": "D", "name": "Continuité & Sauvegardes", "summary": "En cas de cyberattaque ou de panne majeure, l'entreprise est-elle en mesure de garantir la continuité de ses activités et la restauration de ses données ?", "why": "Un ransomware peut paralyser une PME pendant plusieurs jours si aucun plan n'est préparé. La continuité d'activité ne s'improvise pas — elle se planifie en amont.", "questions": [{"text": "Les données critiques de l'entreprise sont-elles identifiées ?", "sub": "Ex : données clients, comptabilité, contrats, base de production.", "opts": [{"label": "Non", "desc": "Aucune cartographie des données importantes", "score": 0}, {"label": "Partiel", "desc": "Une idée générale existe mais sans liste formelle", "score": 1}, {"label": "Oui", "desc": "Les données critiques sont listées, classifiées et leur localisation est connue", "score": 2}]}, {"text": "Des sauvegardes régulières et automatiques sont-elles réalisées ?", "sub": "Ex : sauvegarde quotidienne automatique la nuit, synchronisation cloud en continu, backup hebdomadaire.", "opts": [{"label": "Non", "desc": "Pas de sauvegardes systématiques", "score": 0}, {"label": "Partiel", "desc": "Des sauvegardes existent mais manuelles ou irrégulières", "score": 1}, {"label": "Oui", "desc": "Des sauvegardes automatiques quotidiennes ou plus fréquentes sont en place", "score": 2}]}, {"text": "Les sauvegardes sont-elles stockées dans un emplacement séparé (hors site ou cloud) ?", "sub": "Ex : disque externe conservé hors locaux, service cloud distinct, NAS déporté.", "opts": [{"label": "Non", "desc": "Tout est au même endroit — une attaque ou un sinistre détruirait tout", "score": 0}, {"label": "Partiel", "desc": "Une copie partielle est stockée ailleurs de façon irrégulière", "score": 1}, {"label": "Oui", "desc": "Une copie complète est systématiquement conservée hors site ou dans le cloud", "score": 2}]}, {"text": "La restauration des sauvegardes est-elle testée régulièrement ?", "sub": "Ex : test de restauration sur un environnement isolé, vérification de l'intégrité des fichiers restaurés.", "opts": [{"label": "Non", "desc": "Les sauvegardes ne sont jamais testées", "score": 0}, {"label": "Partiel", "desc": "Un test a été fait une fois sans suivi régulier", "score": 1}, {"label": "Oui", "desc": "Des tests de restauration sont réalisés régulièrement et documentés", "score": 2}]}, {"text": "Les sauvegardes sont-elles protégées contre les ransomwares (copies immuables) ?", "sub": "Ex : sauvegardes non directement accessibles depuis le réseau principal, versioning activé.", "opts": [{"label": "Non", "desc": "Les sauvegardes sont accessibles depuis le réseau et pourraient être chiffrées par un ransomware", "score": 0}, {"label": "Partiel", "desc": "Une protection partielle existe", "score": 1}, {"label": "Oui", "desc": "Les sauvegardes sont isolées du réseau principal ou immuables", "score": 2}]}, {"text": "Un plan de continuité d'activité (PCA) est-il défini ?", "sub": "Procédures pour maintenir les activités essentielles en cas d'incident majeur.", "opts": [{"label": "Non", "desc": "Aucun plan de continuité", "score": 0}, {"label": "Partiel", "desc": "Des réflexions informelles existent mais rien n'est documenté", "score": 1}, {"label": "Oui", "desc": "Un PCA formalisé existe avec des procédures claires pour chaque scénario critique", "score": 2}]}, {"text": "Un plan de reprise informatique (PRI/DRP) est-il documenté ?", "sub": "Délais de reprise visés (RTO/RPO), ordre de restauration, responsabilités.", "opts": [{"label": "Non", "desc": "Aucun plan de reprise", "score": 0}, {"label": "Partiel", "desc": "Des éléments de reprise existent mais sans formalisation ni délais définis", "score": 1}, {"label": "Oui", "desc": "Un plan de reprise complet avec objectifs de temps de reprise (RTO/RPO) est documenté", "score": 2}]}, {"text": "Les fournisseurs critiques ont-ils leurs propres plans de continuité ?", "sub": "Ex : votre hébergeur, votre fournisseur de logiciel métier, votre ISP.", "opts": [{"label": "Non", "desc": "Non vérifié", "score": 0}, {"label": "Partiel", "desc": "Vérifié pour certains fournisseurs clés uniquement", "score": 1}, {"label": "Oui", "desc": "Les engagements de continuité sont vérifiés et contractualisés avec tous les fournisseurs critiques", "score": 2}]}, {"text": "Des exercices de continuité ou de reprise sont-ils réalisés ?", "sub": "Ex : simulation de panne serveur, test de bascule vers les sauvegardes, exercice de crise avec les équipes.", "opts": [{"label": "Non", "desc": "Jamais testé", "score": 0}, {"label": "Partiel", "desc": "Un exercice ponctuel a eu lieu sans régularité", "score": 1}, {"label": "Oui", "desc": "Des exercices réguliers sont planifiés et leurs résultats documentés", "score": 2}]}, {"text": "Les délais de reprise acceptable pour les activités critiques sont-ils définis ?", "sub": "Combien de temps l'entreprise peut-elle fonctionner sans tel ou tel système ?", "opts": [{"label": "Non", "desc": "Ces délais n'ont jamais été définis", "score": 0}, {"label": "Partiel", "desc": "Une idée générale existe sans formalisation", "score": 1}, {"label": "Oui", "desc": "Les RTO et RPO sont définis pour chaque activité critique et connus des responsables", "score": 2}]}, {"text": "Respectez-vous la règle de sauvegarde 3-2-1 ?", "sub": "3 copies de données, 2 supports différents, 1 copie hors site (ex : cloud ou disque chez un tiers).", "opts": [{"label": "Non", "desc": "Pas du tout — les sauvegardes ne respectent pas ce principe", "score": 0}, {"label": "Partiel", "desc": "En cours d'implémentation mais pas encore au niveau 3-2-1 complet", "score": 1}, {"label": "Oui", "desc": "3 copies sur 2 supports différents dont 1 hors site — règle respectée", "score": 2}]}]}, {"letter": "E", "name": "Fournisseurs", "summary": "L'organisation évalue-t-elle les risques cyber liés à ses prestataires et sous-traitants, et contractualise-t-elle des exigences de sécurité avec eux ?", "why": "La majorité des cyberattaques récentes transitent par la chaîne d'approvisionnement. Un fournisseur peu sécurisé devient une porte d'entrée directe vers votre entreprise.", "questions": [{"text": "Disposez-vous d'une liste complète des fournisseurs ayant accès à vos données ou systèmes ?", "sub": "Ex : infogéreurs, comptables externes, développeurs, hébergeurs, SaaS.", "opts": [{"label": "Non", "desc": "Pas de liste centralisée", "score": 0}, {"label": "Partiel", "desc": "Une liste partielle ou non mise à jour existe", "score": 1}, {"label": "Oui", "desc": "Une liste complète, régulièrement mise à jour, est maintenue", "score": 2}]}, {"text": "Les fournisseurs sont-ils classifiés selon leur niveau d'accès et leur criticité ?", "sub": "Ex : fournisseur critique (accès données sensibles) vs fournisseur standard.", "opts": [{"label": "Non", "desc": "Aucune classification", "score": 0}, {"label": "Partiel", "desc": "Une distinction informelle est faite pour certains", "score": 1}, {"label": "Oui", "desc": "Une classification formelle est appliquée et mise à jour", "score": 2}]}, {"text": "Des exigences de sécurité sont-elles incluses dans les contrats fournisseurs ?", "sub": "Ex : clauses de confidentialité, obligations de notification d'incident, droit d'audit.", "opts": [{"label": "Non", "desc": "Aucune clause de sécurité dans les contrats", "score": 0}, {"label": "Partiel", "desc": "Des clauses existent pour certains contrats clés uniquement", "score": 1}, {"label": "Oui", "desc": "Des clauses de sécurité standardisées sont systématiquement intégrées dans tous les contrats", "score": 2}]}, {"text": "La sécurité des fournisseurs critiques est-elle évaluée avant contractualisation ?", "sub": "Ex : questionnaire de sécurité, vérification de certifications ISO 27001.", "opts": [{"label": "Non", "desc": "Aucune évaluation avant signature", "score": 0}, {"label": "Partiel", "desc": "Une vérification informelle est faite pour certains", "score": 1}, {"label": "Oui", "desc": "Un processus d'évaluation structuré est appliqué systématiquement", "score": 2}]}, {"text": "Les accès des fournisseurs à vos systèmes sont-ils limités au strict nécessaire ?", "sub": "Ex : accès limité aux seuls dossiers nécessaires, durée d'accès définie, révocation automatique à l'échéance.", "opts": [{"label": "Non", "desc": "Les accès fournisseurs ne sont pas spécifiquement limités", "score": 0}, {"label": "Partiel", "desc": "Des limitations existent pour certains fournisseurs", "score": 1}, {"label": "Oui", "desc": "Le principe du moindre privilège est appliqué à tous les accès fournisseurs", "score": 2}]}, {"text": "Les accès fournisseurs sont-ils révoqués dès la fin du contrat ou de la mission ?", "sub": "Ex : désactivation du compte VPN le jour de fin de contrat, retrait des droits dans les 24h suivant la fin.", "opts": [{"label": "Non", "desc": "Les accès persistent souvent après la fin de la relation", "score": 0}, {"label": "Partiel", "desc": "La révocation est faite mais peut prendre du temps", "score": 1}, {"label": "Oui", "desc": "Une procédure formelle garantit la révocation immédiate dès fin de contrat", "score": 2}]}, {"text": "Un suivi de la performance sécurité des fournisseurs est-il réalisé ?", "sub": "Ex : revue annuelle, vérification des incidents chez le fournisseur, mise à jour des certifications.", "opts": [{"label": "Non", "desc": "Aucun suivi après contractualisation", "score": 0}, {"label": "Partiel", "desc": "Un suivi informel ou ponctuel est réalisé", "score": 1}, {"label": "Oui", "desc": "Un suivi régulier structuré est en place avec indicateurs et revues périodiques", "score": 2}]}, {"text": "En cas d'incident chez un fournisseur clé, avez-vous un plan de substitution ?", "sub": "Ex : liste d'alternatives identifiées, contrat de remplacement prêt, procédure de migration documentée.", "opts": [{"label": "Non", "desc": "Aucun plan de substitution prévu", "score": 0}, {"label": "Partiel", "desc": "Des alternatives sont connues mais rien n'est préparé formellement", "score": 1}, {"label": "Oui", "desc": "Des plans de substitution sont documentés pour les fournisseurs critiques", "score": 2}]}, {"text": "Les sous-traitants de vos fournisseurs (4e parties) sont-ils pris en compte ?", "sub": "Ex : votre hébergeur peut lui-même sous-traiter à un datacenter tiers.", "opts": [{"label": "Non", "desc": "La chaîne au-delà des fournisseurs directs n'est pas considérée", "score": 0}, {"label": "Partiel", "desc": "Une attention est portée aux sous-traitants pour les fournisseurs les plus critiques", "score": 1}, {"label": "Oui", "desc": "Les exigences s'appliquent à toute la chaîne d'approvisionnement", "score": 2}]}, {"text": "Les fournisseurs sont-ils informés de vos exigences NIS2 si applicable ?", "sub": "Ex : envoi d'un courrier ou email de mise en conformité, clause NIS2 ajoutée dans les contrats en cours.", "opts": [{"label": "Non", "desc": "Les fournisseurs ne sont pas informés des exigences réglementaires", "score": 0}, {"label": "Partiel", "desc": "Certains fournisseurs clés sont informés", "score": 1}, {"label": "Oui", "desc": "Tous les fournisseurs concernés reçoivent les exigences et confirment leur conformité", "score": 2}]}]}, {"letter": "F", "name": "Sécurité technique", "summary": "Les systèmes de l'organisation sont-ils protégés, surveillés et mis à jour de façon à résister aux menaces courantes ?", "why": "La grande majorité des cyberattaques exploite des vulnérabilités connues et non corrigées. Une hygiène technique de base réduit drastiquement la surface d'attaque.", "questions": [{"text": "Les systèmes d'exploitation et logiciels sont-ils mis à jour régulièrement ?", "sub": "Correctifs de sécurité, mises à jour de versions, patches.", "opts": [{"label": "Non", "desc": "Les mises à jour sont rares ou ignorées", "score": 0}, {"label": "Partiel", "desc": "Les mises à jour sont faites occasionnellement ou uniquement sur certains systèmes", "score": 1}, {"label": "Oui", "desc": "Les mises à jour sont automatisées et vérifiées régulièrement sur tous les systèmes", "score": 2}]}, {"text": "Un antivirus ou solution EDR est-il installé et à jour sur tous les postes ?", "sub": "EDR = Endpoint Detection & Response, solution plus avancée qu'un antivirus classique.", "opts": [{"label": "Non", "desc": "Pas de protection sur certains ou tous les postes", "score": 0}, {"label": "Partiel", "desc": "Une protection existe sur la plupart des postes mais pas tous", "score": 1}, {"label": "Oui", "desc": "Tous les postes sont protégés, les signatures sont à jour et les alertes sont surveillées", "score": 2}]}, {"text": "Un pare-feu est-il en place et correctement configuré ?", "sub": "Ex : règles de filtrage définies, accès entrants bloqués par défaut, logs de connexion activés.", "opts": [{"label": "Non", "desc": "Pas de pare-feu ou configuration par défaut non revue", "score": 0}, {"label": "Partiel", "desc": "Un pare-feu existe mais sa configuration n'a pas été revue depuis longtemps", "score": 1}, {"label": "Oui", "desc": "Un pare-feu est en place, configuré de façon restrictive et régulièrement revu", "score": 2}]}, {"text": "Les accès Wi-Fi sont-ils sécurisés et séparés (réseau visiteurs distinct) ?", "sub": "Ex : WPA3 ou WPA2 avec mot de passe complexe, réseau invité isolé du réseau interne sur un VLAN séparé.", "opts": [{"label": "Non", "desc": "Wi-Fi sans mot de passe sécurisé ou réseau unique pour tous", "score": 0}, {"label": "Partiel", "desc": "Le Wi-Fi est sécurisé mais aucun réseau visiteur séparé", "score": 1}, {"label": "Oui", "desc": "Wi-Fi chiffré avec réseau visiteur isolé et mot de passe changé régulièrement", "score": 2}]}, {"text": "L'accès à distance (VPN, bureau à distance) est-il sécurisé ?", "sub": "Ex : VPN avec certificat, MFA activé pour la connexion à distance, logs de connexion distante surveillés.", "opts": [{"label": "Non", "desc": "Accès distant sans protection spécifique", "score": 0}, {"label": "Partiel", "desc": "Un VPN existe mais sans MFA ou politique stricte", "score": 1}, {"label": "Oui", "desc": "VPN avec authentification forte (MFA), accès limités et logs actifs", "score": 2}]}, {"text": "Les vulnérabilités techniques sont-elles identifiées et corrigées ?", "sub": "Ex : scans de vulnérabilités, tests de pénétration, revue de configuration.", "opts": [{"label": "Non", "desc": "Aucune recherche proactive de vulnérabilités", "score": 0}, {"label": "Partiel", "desc": "Des vérifications ponctuelles ont lieu sans méthode structurée", "score": 1}, {"label": "Oui", "desc": "Des scans réguliers sont réalisés et les vulnérabilités critiques sont corrigées rapidement", "score": 2}]}, {"text": "Les logs et journaux d'événements sont-ils activés et conservés ?", "sub": "Ex : logs de connexion, logs d'accès aux données, logs système.", "opts": [{"label": "Non", "desc": "Aucune journalisation active", "score": 0}, {"label": "Partiel", "desc": "Certains logs sont actifs mais non centralisés ni surveillés", "score": 1}, {"label": "Oui", "desc": "Les logs sont activés, centralisés, conservés au moins 12 mois et régulièrement analysés", "score": 2}]}, {"text": "Les appareils mobiles professionnels (téléphones, tablettes) sont-ils sécurisés ?", "sub": "Ex : chiffrement activé, MDM en place, effacement à distance possible.", "opts": [{"label": "Non", "desc": "Aucune politique de sécurité pour les mobiles", "score": 0}, {"label": "Partiel", "desc": "Des règles de base existent mais sans gestion centralisée", "score": 1}, {"label": "Oui", "desc": "Une politique MDM est en place avec chiffrement, verrouillage et effacement à distance", "score": 2}]}, {"text": "Les données sensibles sont-elles chiffrées au repos et en transit ?", "sub": "Ex : chiffrement des disques durs, HTTPS pour les applications, chiffrement des emails sensibles.", "opts": [{"label": "Non", "desc": "Aucun chiffrement en place", "score": 0}, {"label": "Partiel", "desc": "Le chiffrement est utilisé pour certaines données ou communications", "score": 1}, {"label": "Oui", "desc": "Le chiffrement est systématiquement appliqué aux données sensibles au repos et en transit", "score": 2}]}, {"text": "Une politique de gestion des mots de passe est-elle appliquée ?", "sub": "Longueur minimale, complexité, pas de réutilisation, gestionnaire de mots de passe.", "opts": [{"label": "Non", "desc": "Aucune politique — chaque employé fait comme il veut", "score": 0}, {"label": "Partiel", "desc": "Des règles informelles existent mais ne sont pas vérifiées", "score": 1}, {"label": "Oui", "desc": "Une politique formelle est en place avec un gestionnaire de mots de passe recommandé", "score": 2}]}]}, {"letter": "G", "name": "Accès & Identités", "summary": "L'organisation contrôle-t-elle précisément qui accède à quoi dans son système d'information, en appliquant le principe du moindre privilège ?", "why": "Un compte compromis avec trop de droits peut causer des dégâts considérables. Limiter les accès au strict nécessaire réduit l'impact de toute compromission.", "questions": [{"text": "Les droits d'accès sont-ils attribués selon le rôle de chaque personne ?", "sub": "Chaque employé n'accède qu'aux données et systèmes nécessaires à son travail.", "opts": [{"label": "Non", "desc": "Tout le monde a accès à tout ou presque", "score": 0}, {"label": "Partiel", "desc": "Des distinctions existent pour certains systèmes sensibles", "score": 1}, {"label": "Oui", "desc": "Le principe du moindre privilège est appliqué et documenté pour tous les accès", "score": 2}]}, {"text": "Une procédure formelle d'attribution des accès existe-t-elle ?", "sub": "Demande, approbation, attribution et documentation de chaque accès.", "opts": [{"label": "Non", "desc": "Les accès sont donnés sans processus formel", "score": 0}, {"label": "Partiel", "desc": "Un processus informel existe pour certains accès", "score": 1}, {"label": "Oui", "desc": "Un processus formel d'approbation et de documentation est appliqué systématiquement", "score": 2}]}, {"text": "Les accès sont-ils revus régulièrement pour s'assurer qu'ils sont toujours justifiés ?", "sub": "Ex : revue des droits annuelle, revue lors des changements de poste.", "opts": [{"label": "Non", "desc": "Aucune revue des accès existants", "score": 0}, {"label": "Partiel", "desc": "Une revue est faite ponctuellement ou uniquement lors d'incidents", "score": 1}, {"label": "Oui", "desc": "Une revue formelle des accès est réalisée au moins une fois par an", "score": 2}]}, {"text": "Les comptes des employés quittant l'entreprise sont-ils désactivés immédiatement ?", "sub": "Ex : procédure RH déclenchant automatiquement la révocation des accès informatiques le jour du départ.", "opts": [{"label": "Non", "desc": "Les comptes persistent souvent après le départ", "score": 0}, {"label": "Partiel", "desc": "La désactivation est faite mais peut prendre plusieurs jours", "score": 1}, {"label": "Oui", "desc": "Une procédure garantit la désactivation le jour du départ, liée aux RH", "score": 2}]}, {"text": "L'authentification à deux facteurs (MFA) est-elle en place ?", "sub": "Pour emails, VPN, outils cloud, applications métiers critiques.", "opts": [{"label": "Non", "desc": "Aucun MFA en place", "score": 0}, {"label": "Partiel", "desc": "Le MFA est activé sur certains outils critiques uniquement", "score": 1}, {"label": "Oui", "desc": "Le MFA est obligatoire pour tous les accès importants et vérifiés régulièrement", "score": 2}]}, {"text": "Les comptes administrateurs sont-ils séparés des comptes utilisateurs courants ?", "sub": "Les tâches d'administration ne se font pas avec le compte utilisé au quotidien.", "opts": [{"label": "Non", "desc": "Les mêmes comptes servent pour tout", "score": 0}, {"label": "Partiel", "desc": "Une séparation existe pour certains systèmes", "score": 1}, {"label": "Oui", "desc": "Des comptes administrateurs dédiés et distincts sont utilisés pour toutes les tâches d'administration", "score": 2}]}, {"text": "Les mots de passe partagés entre plusieurs personnes sont-ils évités ?", "sub": "Chaque personne a son propre compte identifiable.", "opts": [{"label": "Non", "desc": "Des mots de passe partagés sont courants", "score": 0}, {"label": "Partiel", "desc": "Limité à quelques cas exceptionnels", "score": 1}, {"label": "Oui", "desc": "Aucun mot de passe partagé — chaque accès est nominatif et traçable", "score": 2}]}, {"text": "Les accès aux systèmes sensibles sont-ils tracés et audités ?", "sub": "Ex : qui a accédé à quoi, quand, depuis où.", "opts": [{"label": "Non", "desc": "Aucune traçabilité des accès", "score": 0}, {"label": "Partiel", "desc": "Certains accès sensibles sont tracés", "score": 1}, {"label": "Oui", "desc": "Tous les accès aux systèmes sensibles sont journalisés et les logs sont conservés et analysés", "score": 2}]}, {"text": "Une politique de gestion des accès est-elle documentée ?", "sub": "Ex : document décrivant les règles d'attribution, de révision et de révocation des accès, accessible à tous.", "opts": [{"label": "Non", "desc": "Aucune politique formelle", "score": 0}, {"label": "Partiel", "desc": "Des règles informelles existent", "score": 1}, {"label": "Oui", "desc": "Une politique formelle est documentée, connue et appliquée", "score": 2}]}, {"text": "Les accès physiques aux locaux et salles serveurs sont-ils contrôlés ?", "sub": "Ex : badges, codes d'accès, visiteurs accompagnés.", "opts": [{"label": "Non", "desc": "Aucun contrôle d'accès physique spécifique", "score": 0}, {"label": "Partiel", "desc": "Un contrôle de base existe mais sans traçabilité", "score": 1}, {"label": "Oui", "desc": "Les accès physiques sont contrôlés, tracés et revus régulièrement", "score": 2}]}]}, {"letter": "H", "name": "Actifs & Sensibilisation", "summary": "L'organisation connaît-elle l'ensemble de ses actifs critiques, et ses collaborateurs sont-ils formés aux bonnes pratiques de sécurité ?", "why": "On ne protège pas ce qu'on ne connaît pas. Et même le meilleur système technique peut être contourné par un collaborateur non sensibilisé — le phishing reste le vecteur d'attaque numéro un.", "questions": [{"text": "Un inventaire des équipements informatiques est-il maintenu ?", "sub": "Ordinateurs, serveurs, imprimantes réseau, équipements actifs, appareils mobiles professionnels.", "opts": [{"label": "Non", "desc": "Aucun inventaire", "score": 0}, {"label": "Partiel", "desc": "Un inventaire partiel ou non mis à jour existe", "score": 1}, {"label": "Oui", "desc": "Un inventaire complet et à jour est maintenu avec les informations clés de chaque équipement", "score": 2}]}, {"text": "Un inventaire des logiciels et applications utilisées est-il tenu à jour ?", "sub": "Incluant les logiciels SaaS, cloud, applications métiers.", "opts": [{"label": "Non", "desc": "Aucun inventaire logiciel", "score": 0}, {"label": "Partiel", "desc": "Les principaux logiciels sont connus mais sans inventaire formel", "score": 1}, {"label": "Oui", "desc": "Un inventaire complet incluant versions et licences est maintenu à jour", "score": 2}]}, {"text": "Les données sensibles sont-elles identifiées et classifiées ?", "sub": "Ex : données clients, données financières, données RH, données soumises au RGPD.", "opts": [{"label": "Non", "desc": "Aucune classification des données", "score": 0}, {"label": "Partiel", "desc": "Les données les plus sensibles sont connues mais sans classification formelle", "score": 1}, {"label": "Oui", "desc": "Toutes les données sont classifiées selon leur sensibilité avec des règles de traitement adaptées", "score": 2}]}, {"text": "L'utilisation d'appareils ou logiciels non autorisés (shadow IT) est-elle encadrée ?", "sub": "Ex : employés qui utilisent leur propre cloud, applications non approuvées.", "opts": [{"label": "Non", "desc": "Aucune politique — chacun utilise ce qu'il veut", "score": 0}, {"label": "Partiel", "desc": "Des règles existent mais ne sont pas vérifiées", "score": 1}, {"label": "Oui", "desc": "Une politique claire interdit le shadow IT et des contrôles techniques le limitent", "score": 2}]}, {"text": "Les employés reçoivent-ils une formation initiale à la cybersécurité à l'embauche ?", "sub": "Ex : présentation sécurité lors de l'onboarding, remise de la charte informatique signée, vidéo de sensibilisation.", "opts": [{"label": "Non", "desc": "Aucune formation à l'embauche", "score": 0}, {"label": "Partiel", "desc": "Des informations générales sont données mais sans formation structurée", "score": 1}, {"label": "Oui", "desc": "Une formation obligatoire est dispensée à tous les nouveaux employés", "score": 2}]}, {"text": "Des formations ou rappels réguliers de cybersécurité sont-ils organisés ?", "sub": "Ex : newsletter sécurité trimestrielle, session de rappel annuelle, quiz en ligne, affiche dans les locaux.", "opts": [{"label": "Non", "desc": "Aucune formation continue", "score": 0}, {"label": "Partiel", "desc": "Des informations sont partagées occasionnellement sans structure", "score": 1}, {"label": "Oui", "desc": "Des formations ou campagnes de sensibilisation sont organisées au moins une fois par an", "score": 2}]}, {"text": "Les employés sont-ils sensibilisés aux risques de phishing et d'ingénierie sociale ?", "sub": "Ex : formation sur la reconnaissance des emails suspects, exemples réels de phishing, bonnes pratiques mobiles.", "opts": [{"label": "Non", "desc": "Ce sujet n'est pas abordé", "score": 0}, {"label": "Partiel", "desc": "Des informations générales sont données mais sans exemples pratiques", "score": 1}, {"label": "Oui", "desc": "Des formations spécifiques avec exemples concrets et tests de phishing sont réalisées", "score": 2}]}, {"text": "Des simulations de phishing sont-elles réalisées pour tester les employés ?", "sub": "Ex : campagne de faux phishing envoyée aux employés, taux de clics mesuré, formation corrective pour les cliqueurs.", "opts": [{"label": "Non", "desc": "Jamais", "score": 0}, {"label": "Partiel", "desc": "Un test ponctuel a eu lieu sans suivi", "score": 1}, {"label": "Oui", "desc": "Des simulations régulières sont organisées avec suivi des résultats et formation corrective", "score": 2}]}, {"text": "Les équipements en fin de vie sont-ils correctement décommissionnés ?", "sub": "Ex : effacement sécurisé des données avant mise au rebut ou revente.", "opts": [{"label": "Non", "desc": "Les équipements sont jetés ou revendus sans effacement des données", "score": 0}, {"label": "Partiel", "desc": "Une suppression basique est faite sans garantie d'effacement complet", "score": 1}, {"label": "Oui", "desc": "Une procédure d'effacement sécurisé certifiée est appliquée à tous les équipements en fin de vie", "score": 2}]}, {"text": "Une politique de bureau propre et écran verrouillé est-elle appliquée ?", "sub": "Ex : pas de documents sensibles laissés visibles, écrans verrouillés en cas d'absence.", "opts": [{"label": "Non", "desc": "Aucune règle sur ce sujet", "score": 0}, {"label": "Partiel", "desc": "Des recommandations existent mais ne sont pas vérifiées", "score": 1}, {"label": "Oui", "desc": "La politique est documentée, communiquée et des rappels réguliers sont faits", "score": 2}]}]}];
const MODULES = [{"id": "assets", "icon": "🖥️", "title": "Inventaire des actifs", "desc": "Identifiez vos équipements, logiciels et données critiques", "fields": [{"id": "hw", "label": "Équipements matériels", "placeholder": "Ex : 5 PC portables Dell, 1 serveur HP, 3 imprimantes réseau..."}, {"id": "sw", "label": "Logiciels & applications métiers", "placeholder": "Ex : Office 365, Sage Comptabilité, logiciel de devis, ERP..."}, {"id": "saas", "label": "Services cloud & SaaS utilisés", "placeholder": "Ex : Google Drive, Dropbox, logiciel RH en ligne, CRM..."}, {"id": "data", "label": "Données sensibles détenues", "placeholder": "Ex : données clients, données RH, données financières..."}, {"id": "critical", "label": "Systèmes critiques (sans lesquels l'activité s'arrête)", "placeholder": "Ex : serveur de fichiers, logiciel de caisse, ERP, site e-commerce..."}, {"id": "eol", "label": "Équipements en fin de vie ou non supportés", "placeholder": "Ex : PC sous Windows 7, vieux serveur sans mise à jour..."}]}, {"id": "data_map", "icon": "🗂️", "title": "Cartographie des traitements RGPD", "desc": "Identifiez vos traitements de données personnelles (obligation légale)", "fields": [{"id": "treatments", "label": "Principaux traitements de données personnelles", "placeholder": "Ex : gestion clients, gestion RH, facturation, newsletter, vidéosurveillance..."}, {"id": "categories", "label": "Catégories de données traitées", "placeholder": "Ex : nom, email, téléphone, données bancaires, données de santé..."}, {"id": "recipients", "label": "Qui a accès à ces données ?", "placeholder": "Ex : direction, commerciaux, comptable externe, prestataire IT..."}, {"id": "retention", "label": "Durées de conservation", "placeholder": "Ex : données clients 5 ans, données RH 50 ans..."}, {"id": "transfers", "label": "Transferts de données hors UE", "placeholder": "Ex : Google Analytics, serveurs aux USA... ou Aucun"}, {"id": "dpo", "label": "DPO désigné (Délégué à la Protection des Données)", "placeholder": "Nom et coordonnées, ou Non désigné"}]}, {"id": "suppliers", "icon": "🤝", "title": "Cartographie des fournisseurs", "desc": "Identifiez vos prestataires ayant accès à vos systèmes ou données", "fields": [{"id": "it", "label": "Fournisseurs IT (infogérance, hébergement, logiciels)", "placeholder": "Ex : prestataire IT ABC, hébergeur OVH, éditeur logiciel XYZ..."}, {"id": "data_access", "label": "Fournisseurs ayant accès à vos données", "placeholder": "Ex : comptable externe, avocat, prestataire RH, agence marketing..."}, {"id": "critical", "label": "Fournisseurs critiques (leur panne bloquerait votre activité)", "placeholder": "Ex : fournisseur ERP, opérateur télécom, hébergeur site e-commerce..."}, {"id": "contracts", "label": "Clauses de sécurité / confidentialité dans les contrats ?", "placeholder": "Décrivez la situation pour vos contrats principaux..."}, {"id": "access", "label": "Comment gérez-vous les accès de vos fournisseurs ?", "placeholder": "Ex : VPN dédié, compte nominatif, accès temporaire, aucune procédure..."}, {"id": "incidents", "label": "Incidents liés à un fournisseur (si applicable)", "placeholder": "Ex : fuite de données chez un prestataire, indisponibilité SaaS... ou Aucun"}]}];

// ── STATE ─────────────────────────────────────────────
let company = "", sector = "", empSize = "";
let currentTheme = 0;
let answers = [];
let comments = [];
let moduleData = {};
let currentModuleId = null;
let globalScores = [];
let fromInterlude = false;

function initAnswers() {
  answers = THEMES.map(t => Array(t.questions.length).fill(null));
  comments = THEMES.map(t => Array(t.questions.length).fill(""));
}
initAnswers();

// ── UTILS ─────────────────────────────────────────────
function show(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const el = document.getElementById(id);
  if (el && el.classList.contains("screen")) el.classList.add("active");
  window.scrollTo(0, 0);
  const bar = document.getElementById("save-bar");
  bar.style.display = (id === "s-intro") ? "none" : "flex";
  updateSaveBarStatus();
}

function showToast(msg) {
  const t = document.getElementById("save-toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2500);
}

function updateSaveBarStatus() {
  const answered = answers.reduce((s,a) => s + a.filter(x => x !== null).length, 0);
  const total = THEMES.reduce((s,t) => s + t.questions.length, 0);
  document.getElementById("save-bar-status").textContent =
    (company ? company + " · " : "") + answered + "/" + total + " questions répondues";
}

// ── WELCOME SCREEN ────────────────────────────────────
document.getElementById("btn-welcome-start").addEventListener("click", function() {
  document.getElementById("s-welcome").style.display = "none";
  renderModulesList();
  show("s-intro");
});

document.getElementById("btn-welcome-load").addEventListener("click", function() {
  document.getElementById("file-welcome-load").click();
});

document.getElementById("file-welcome-load").addEventListener("change", function(e) {
  loadFromFile(e.target.files[0], function() {
    document.getElementById("s-welcome").style.display = "none";
    renderTheme(currentTheme);
    renderThemeNav();
    show("s-questions");
    showToast("✓ Audit chargé avec succès");
  });
});

// ── SAVE / LOAD ───────────────────────────────────────
function buildSaveData() {
  return {
    version: "5.0",
    savedAt: new Date().toISOString(),
    company, sector, empSize,
    currentTheme,
    answers, comments,
    moduleData
  };
}

function restoreSaveData(data) {
  company = data.company || "";
  sector = data.sector || "";
  empSize = data.empSize || "";
  currentTheme = data.currentTheme || 0;
  answers = data.answers || THEMES.map(t => Array(t.questions.length).fill(null));
  comments = data.comments || THEMES.map(t => Array(t.questions.length).fill(""));
  moduleData = data.moduleData || {};
  // Restore form fields
  const ci = document.getElementById("inp-company");
  const si = document.getElementById("inp-sector");
  if (ci) ci.value = company;
  if (si) si.value = sector;

}

function saveToFile() {
  const data = buildSaveData();
  const blob = new Blob([JSON.stringify(data, null, 2)], {type: "application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const name = (company || "audit").replace(/[^a-zA-Z0-9]/g, "_");
  a.download = "audit_nis2_" + name + "_" + new Date().toISOString().slice(0,10) + ".json";
  a.click();
  URL.revokeObjectURL(url);
  showToast("✓ Sauvegarde téléchargée");
}

function loadFromFile(file, callback) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      restoreSaveData(data);
      renderModulesList();
      if (callback) callback();
    } catch(err) {
      showToast("❌ Fichier invalide");
    }
  };
  reader.readAsText(file);
}

document.getElementById("btn-bar-save").addEventListener("click", saveToFile);
document.getElementById("btn-bar-load").addEventListener("click", function() {
  document.getElementById("file-load-input").click();
});
document.getElementById("file-load-input").addEventListener("change", function(e) {
  loadFromFile(e.target.files[0], function() {
    renderTheme(currentTheme);
    renderThemeNav();
    show("s-questions");
    showToast("✓ Audit chargé avec succès");
  });
});

// ── MODULES LIST ──────────────────────────────────────
function renderModulesList() {
  const container = document.getElementById("modules-list");
  if (!container) return;
  container.innerHTML = MODULES.map(function(mod) {
    const data = moduleData[mod.id];
    const filled = data ? Object.values(data).filter(v => v && v.trim()).length : 0;
    const done = filled > 0;
    return '<div class="mod-card">'
      + '<div class="mod-header">'
      + '<div><span class="mod-icon">' + mod.icon + '</span><strong style="font-size:.9rem">' + mod.title + '</strong></div>'
      + '<span class="mod-status ' + (done?"done":"") + '">' + (done ? "✓ Renseigné" : "Facultatif") + '</span>'
      + '</div><p>' + mod.desc + '</p>'
      + '<button class="btn btn-outline" style="font-size:.82rem;padding:.4rem 1rem" data-mod="' + mod.id + '">' + (done?"Modifier":"Renseigner →") + '</button>'
      + '</div>';
  }).join("");
  container.querySelectorAll("[data-mod]").forEach(function(btn) {
    btn.addEventListener("click", function() {
      fromInterlude = false;
      openModule(this.getAttribute("data-mod"));
    });
  });
}

function renderInterludeModules() {
  const container = document.getElementById("interlude-modules-list");
  if (!container) return;
  container.innerHTML = MODULES.map(function(mod) {
    const data = moduleData[mod.id];
    const filled = data ? Object.values(data).filter(v => v && v.trim()).length : 0;
    const done = filled > 0;
    return '<div class="mod-card">'
      + '<div class="mod-header">'
      + '<div><span class="mod-icon">' + mod.icon + '</span><strong style="font-size:.9rem">' + mod.title + '</strong></div>'
      + '<span class="mod-status ' + (done?"done":"") + '">' + (done ? "✓ Renseigné" : "Facultatif") + '</span>'
      + '</div><p>' + mod.desc + '</p>'
      + '<button class="btn btn-outline" style="font-size:.82rem;padding:.4rem 1rem" data-mod-il="' + mod.id + '">' + (done?"Modifier":"Renseigner →") + '</button>'
      + '</div>';
  }).join("");
  container.querySelectorAll("[data-mod-il]").forEach(function(btn) {
    btn.addEventListener("click", function() {
      fromInterlude = true;
      openModule(this.getAttribute("data-mod-il"));
    });
  });
}

// ── MODULE OPEN/SAVE ──────────────────────────────────
function openModule(id) {
  currentModuleId = id;
  const mod = MODULES.find(m => m.id === id);
  const saved = moduleData[id] || {};
  document.getElementById("mod-letter").textContent = mod.icon;
  document.getElementById("mod-title").textContent = mod.title;
  document.getElementById("mod-desc").textContent = mod.desc;
  const container = document.getElementById("mod-fields");
  container.innerHTML = mod.fields.map(f => {
    const val = saved[f.id] || "";
    return '<div class="field"><label>' + f.label + '</label>'
      + '<textarea id="mf-' + f.id + '" placeholder="' + f.placeholder + '" rows="3" style="resize:vertical">' + val + '</textarea></div>';
  }).join("");
  show("s-module");
}

document.getElementById("btn-mod-back").addEventListener("click", function() {
  if (fromInterlude) { renderInterludeModules(); show("s-modules-interlude"); }
  else { renderModulesList(); show("s-intro"); }
});

document.getElementById("btn-mod-save").addEventListener("click", function() {
  const mod = MODULES.find(m => m.id === currentModuleId);
  moduleData[currentModuleId] = {};
  mod.fields.forEach(f => {
    const el = document.getElementById("mf-" + f.id);
    if (el) moduleData[currentModuleId][f.id] = el.value;
  });
  if (fromInterlude) { renderInterludeModules(); show("s-modules-interlude"); }
  else { renderModulesList(); show("s-intro"); }
  showToast("✓ Module enregistré");
});

// ── INTRO → START ─────────────────────────────────────
document.getElementById("btn-start").addEventListener("click", function() {
  const c = document.getElementById("inp-company").value.trim();
  const err = document.getElementById("intro-error");
  if (!c) { err.textContent = "Veuillez saisir le nom de l'entreprise."; err.style.display = "block"; return; }
  err.style.display = "none";
  company = c;
  sector = document.getElementById("inp-sector").value.trim();
  empSize = "";
  initAnswers();
  currentTheme = 0;
  renderTheme(0);
  renderThemeNav();
  show("s-questions");
});

// ── THEME NAV ─────────────────────────────────────────
function getThemeCompletionStatus(ti) {
  const total = THEMES[ti].questions.length;
  const answered = answers[ti].filter(a => a !== null).length;
  if (answered === 0) return "empty";
  if (answered === total) return "done";
  return "partial";
}

function renderThemeNav() {
  const nav = document.getElementById("theme-nav");
  nav.innerHTML = THEMES.map(function(t, i) {
    const status = getThemeCompletionStatus(i);
    let cls = "tnav-btn";
    if (i === currentTheme) cls += " active";
    else if (status === "done") cls += " done";
    else if (status === "partial") cls += " partial";
    return '<button class="' + cls + '" data-ti="' + i + '">' + t.letter + '</button>';
  }).join("");
  nav.querySelectorAll("[data-ti]").forEach(function(btn) {
    btn.addEventListener("click", function() {
      const ti = parseInt(this.getAttribute("data-ti"));
      currentTheme = ti;
      renderTheme(ti);
      renderThemeNav();
      window.scrollTo(0, 0);
    });
  });

  // Progress overview
  const total = THEMES.reduce((s, t) => s + t.questions.length, 0);
  const answered = answers.reduce((s, a) => s + a.filter(x => x !== null).length, 0);
  const doneThemes = THEMES.filter((_, i) => getThemeCompletionStatus(i) === "done").length;
  document.getElementById("theme-progress-overview").textContent =
    doneThemes + "/8 thèmes complétés · " + answered + "/" + total + " questions répondues";
}

// ── RENDER THEME ──────────────────────────────────────
function renderTheme(idx) {
  const t = THEMES[idx];
  document.getElementById("q-letter").textContent = t.letter;
  document.getElementById("q-name").textContent = t.name;
  document.getElementById("q-summary").textContent = t.summary;
  document.getElementById("q-why").innerHTML = "<strong>Pourquoi c'est important :</strong> " + t.why;
  document.getElementById("prog-fill").style.width = (idx / 8 * 100) + "%";
  document.getElementById("prog-text").textContent = "Thème " + (idx + 1) + " sur 8 — " + t.letter + " : " + t.name;
  document.getElementById("btn-prev").style.visibility = idx === 0 ? "hidden" : "visible";
  document.getElementById("btn-next").textContent = idx === 7 ? "Terminer ✓" : "Suivant →";
  document.getElementById("btn-skip").style.display = idx === 7 ? "none" : "inline-flex";
  document.getElementById("q-error").style.display = "none";
  document.getElementById("q-incomplete-warning").style.display = "none";
  document.getElementById("q-counter").textContent = t.questions.length + " questions — " +
    answers[idx].filter(a => a !== null).length + " répondues";

  const container = document.getElementById("q-container");
  container.innerHTML = "";
  t.questions.forEach(function(q, qi) {
    const saved = answers[idx][qi];
    const savedComment = comments[idx][qi];
    const block = document.createElement("div");
    block.className = "question-block";
    block.id = "qb-" + qi;
    const optsHTML = q.opts.map(function(o, oi) {
      return '<div class="opt' + (saved === oi ? " selected" : "") + '" data-qi="' + qi + '" data-oi="' + oi + '">' +
        '<div class="opt-dot"></div>' +
        '<div class="opt-content">' +
        '<div class="opt-label">' + o.label + '</div>' +
        (o.desc ? '<div class="opt-desc">' + o.desc + '</div>' : "") +
        '</div></div>';
    }).join("");
    block.innerHTML =
      '<div class="q-num">Question ' + (qi + 1) + ' / ' + t.questions.length + '</div>' +
      '<div class="q-text">' + q.text + '</div>' +
      (q.sub ? '<div class="q-sub">' + q.sub + '</div>' : "") +
      '<div class="opts">' + optsHTML + '</div>' +
      '<div class="comment-label">Commentaire (facultatif)</div>' +
      '<textarea class="q-comment" placeholder="Contexte, précision, nuance..." data-qi="' + qi + '">' + savedComment + '</textarea>';
    container.appendChild(block);
  });

  container.querySelectorAll(".opt").forEach(function(btn) {
    btn.addEventListener("click", function() {
      const qi = parseInt(this.getAttribute("data-qi"));
      const oi = parseInt(this.getAttribute("data-oi"));
      answers[idx][qi] = oi;
      document.getElementById("qb-" + qi).querySelectorAll(".opt").forEach(b => b.classList.remove("selected"));
      this.classList.add("selected");
      document.getElementById("qb-" + qi).classList.remove("error");
      document.getElementById("q-error").style.display = "none";
      document.getElementById("q-counter").textContent = t.questions.length + " questions — " +
        answers[idx].filter(a => a !== null).length + " répondues";
      updateSaveBarStatus();
    });
  });

  container.querySelectorAll(".q-comment").forEach(function(ta) {
    ta.addEventListener("change", function() {
      comments[idx][parseInt(this.getAttribute("data-qi"))] = this.value;
    });
  });
}

// ── NAV BUTTONS ───────────────────────────────────────
// NEXT: validates current theme fully before moving
document.getElementById("btn-next").addEventListener("click", function() {
  const unanswered = answers[currentTheme].map((a, i) => ({a, i})).filter(x => x.a === null);
  if (unanswered.length) {
    document.getElementById("q-error").style.display = "block";
    unanswered.forEach(x => document.getElementById("qb-" + x.i).classList.add("error"));
    document.getElementById("qb-" + unanswered[0].i).scrollIntoView({behavior:"smooth",block:"center"});
    return;
  }
  // Theme complete — check if all themes done
  if (currentTheme < 7) {
    currentTheme++;
    renderTheme(currentTheme);
    renderThemeNav();
    window.scrollTo(0, 0);
  } else {
    // Last theme validated — check all themes complete
    const allDone = THEMES.every((_, i) => getThemeCompletionStatus(i) === "done");
    if (allDone) {
      renderInterludeModules();
      show("s-modules-interlude");
    } else {
      document.getElementById("q-incomplete-warning").style.display = "block";
      window.scrollTo(0, 0);
    }
  }
});

// SKIP: move to next theme WITHOUT validating (free navigation)
document.getElementById("btn-skip").addEventListener("click", function() {
  if (currentTheme < 7) {
    currentTheme++;
    renderTheme(currentTheme);
    renderThemeNav();
    window.scrollTo(0, 0);
  } else {
    const allDone = THEMES.every((_, i) => getThemeCompletionStatus(i) === "done");
    if (allDone) {
      renderInterludeModules();
      show("s-modules-interlude");
    } else {
      document.getElementById("q-incomplete-warning").style.display = "block";
      window.scrollTo(0, 0);
    }
  }
});

document.getElementById("btn-prev").addEventListener("click", function() {
  if (currentTheme > 0) {
    currentTheme--;
    renderTheme(currentTheme);
    renderThemeNav();
    window.scrollTo(0, 0);
  }
});

// ── INTERLUDE ─────────────────────────────────────────
document.getElementById("btn-interlude-back").addEventListener("click", function() {
  renderTheme(currentTheme);
  renderThemeNav();
  show("s-questions");
});
document.getElementById("btn-interlude-generate").addEventListener("click", buildReport);

// ── SCORING ───────────────────────────────────────────
function getScore(ti) {
  const t = THEMES[ti];
  const raw = answers[ti].reduce((s, oi, qi) => s + (oi !== null ? t.questions[qi].opts[oi].score : 0), 0);
  const maxScore = t.questions.length * 2;
  return Math.round(raw / maxScore * 100);
}
function levelInfo(s) {
  if (s < 34) return {label:"Niveau faible", color:"#c81e1e", bar:"#ef4444"};
  if (s < 67) return {label:"Niveau intermédiaire", color:"#b45309", bar:"#f59e0b"};
  return {label:"Niveau satisfaisant", color:"#057a55", bar:"#10b981"};
}

// ── BUILD REPORT ──────────────────────────────────────
function buildReport() {
  show("s-report");
  const scores = THEMES.map((_, i) => getScore(i));
  globalScores = scores;
  const global = Math.round(scores.reduce((a, b) => a + b, 0) / 8);
  const lvl = levelInfo(global);
  const now = new Date().toLocaleDateString("fr-BE", {day:"numeric",month:"long",year:"numeric"});

  document.getElementById("r-score").textContent = global + "%";
  document.getElementById("r-meta").textContent = company + (sector ? " — " + sector : "") + (empSize ? " · " + empSize : "") + " · " + now;
  document.getElementById("r-level").textContent = lvl.label;

  document.getElementById("r-themes").innerHTML = THEMES.map(function(t, i) {
    const s = scores[i]; const l = levelInfo(s);
    return '<div class="theme-result"><div class="tr-letter">' + t.letter + '</div><div class="tr-name">' + t.name
      + '</div><div class="tr-bar-wrap"><div class="tr-bar-fill" style="width:' + s + '%;background:' + l.bar + '"></div></div>'
      + '<div class="tr-score" style="color:' + l.color + '">' + s + '%</div></div>';
  }).join("");

  let modHtml = "";
  MODULES.forEach(function(mod) {
    const data = moduleData[mod.id];
    if (!data) return;
    const filled = Object.entries(data).filter(e => e[1] && e[1].trim());
    if (!filled.length) return;
    modHtml += '<div style="margin-bottom:1.25rem"><div style="font-size:.9rem;font-weight:600;color:var(--g800);margin-bottom:.5rem">' + mod.icon + " " + mod.title + '</div>';
    filled.forEach(function(entry) {
      const field = mod.fields.find(f => f.id === entry[0]);
      if (!field) return;
      modHtml += '<div style="background:var(--g50);border-radius:var(--r);padding:.6rem .875rem;border:1px solid var(--g200);margin-bottom:6px">'
        + '<div style="font-size:.75rem;font-weight:600;color:var(--g500);margin-bottom:3px">' + field.label + '</div>'
        + '<div style="font-size:.85rem;color:var(--g700);white-space:pre-wrap">' + entry[1].trim() + '</div></div>';
    });
    modHtml += '</div>';
  });
  if (modHtml) {
    document.getElementById("r-modules-content").innerHTML = modHtml;
    document.getElementById("r-modules-wrap").style.display = "block";
  }
  generateAIReport(scores, global);
}

// ── AI REPORT (OpenAI) ────────────────────────────────
function getModuleSummary() {
  let parts = [];
  MODULES.forEach(function(mod) {
    const data = moduleData[mod.id];
    if (!data) return;
    const filled = Object.entries(data).filter(e => e[1] && e[1].trim());
    if (!filled.length) return;
    let s = "\n\n--- " + mod.title + " ---";
    filled.forEach(function(e) {
      const field = mod.fields.find(f => f.id === e[0]);
      if (field) s += "\n" + field.label + " : " + e[1].trim();
    });
    parts.push(s);
  });
  return parts.join("");
}

async function callOpenAI(prompt, apiKey) {
  const resp = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {"Content-Type":"application/json","Authorization":"Bearer " + apiKey},
    body: JSON.stringify({
      model: "gpt-4o",
      max_tokens: 2000,
      stream: true,
      messages: [{role:"system",content:"Tu es un expert en cybersécurité spécialisé NIS2 2024, travaillant pour CyberAtaraxia (développeur : Selim JERBI). Le logiciel utilisé est CA NIS2 Auditor."},{role:"user",content:prompt}]
    })
  });
  return resp;
}

async function generateAIReport(scores, global) {
  const apiKey = HARDCODED_API_KEY !== "VOTRE_CLE_OPENAI_ICI" ? HARDCODED_API_KEY : "";
  if (!apiKey) {
    document.getElementById("r-ai").innerHTML = '<div style="color:var(--g500);font-style:italic">Aucune clé API configurée — renseignez une clé pour générer l\'analyse IA.</div>';
    document.getElementById("r-api-section").style.display = "block";
    return;
  }
  await runAIStream(scores, global, apiKey);
}

async function runAIStream(scores, global, apiKey) {
  const details = THEMES.map(function(t, i) {
    const weak = t.questions.filter((_, qi) => answers[i][qi] === 0).map(q => q.text);
    const coms = t.questions.map((q, qi) => comments[i][qi] ? q.text + " : " + comments[i][qi] : "").filter(Boolean);
    let s = "Thème " + t.letter + " (" + t.name + ") : " + scores[i] + "%";
    if (weak.length) s += "\n  Points faibles : " + weak.join(" | ");
    if (coms.length) s += "\n  Commentaires : " + coms.join(" | ");
    return s;
  }).join("\n\n");

  const prompt = "Audit de maturité cybersécurité pour \"" + company + "\"" + (sector ? " (" + sector + ")" : "") + (empSize ? ", " + empSize : "") + ".\n\nScore global : " + global + "%\n\n" + details + getModuleSummary() + "\n\nRédige un rapport structuré :\n\nSYNTHÈSE EXÉCUTIVE\n(2-3 phrases sur la situation globale et le niveau de risque)\n\nPOINTS PRIORITAIRES À TRAITER\n(Top 3-5 actions urgentes, numérotées, concrètes, adaptées PME)\n\nPOINTS POSITIFS\n(Ce qui fonctionne bien)\n\nRISQUES ACTUELS\n(Risques concrets que court l'entreprise aujourd'hui)\n\nFEUILLE DE ROUTE\nCourt terme (0-3 mois) :\nMoyen terme (3-6 mois) :\nLong terme (6-12 mois) :\n\nCONFORMITÉ NIS2\n(Niveau actuel et axes de progression vers une conformité NIS2 complète)\n\nTon professionnel, clair, bienveillant. En français.";

  const aiEl = document.getElementById("r-ai");
  try {
    const resp = await callOpenAI(prompt, apiKey);
    if (!resp.ok) {
      const e = await resp.json();
      aiEl.innerHTML = '<div style="color:var(--red)">Erreur API : ' + (e.error && e.error.message ? e.error.message : resp.status) + '</div>';
      document.getElementById("r-api-section").style.display = "block";
      return;
    }
    aiEl.textContent = "";
    const reader = resp.body.getReader();
    const dec = new TextDecoder();
    let buf = "";
    while (true) {
      const {done, value} = await reader.read();
      if (done) break;
      buf += dec.decode(value, {stream: true});
      const lines = buf.split("\n");
      buf = lines.pop();
      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const data = line.slice(6).trim();
        if (data === "[DONE]") break;
        try {
          const j = JSON.parse(data);
          const text = j.choices && j.choices[0] && j.choices[0].delta && j.choices[0].delta.content;
          if (text) aiEl.textContent += text;
        } catch(e) {}
      }
    }
  } catch(err) {
    aiEl.innerHTML = '<div style="color:var(--red)">Erreur : ' + err.message + '</div>';
    document.getElementById("r-api-section").style.display = "block";
  }
}

document.getElementById("btn-retry-api").addEventListener("click", async function() {
  const k = document.getElementById("inline-api-key").value.trim();
  if (!k.startsWith("sk-")) { alert("Clé invalide. Elle doit commencer par sk-..."); return; }
  document.getElementById("r-api-section").style.display = "none";
  document.getElementById("r-ai").innerHTML = '<div class="loading"><div class="dots"><span></span><span></span><span></span></div>&nbsp;Génération en cours...</div>';
  await runAIStream(globalScores, parseInt(document.getElementById("r-score").textContent), k);
});

// ── EXPORT ────────────────────────────────────────────
function buildPrintAnswers() {
  const scores = THEMES.map((_, i) => getScore(i));
  const global = Math.round(scores.reduce((a,b)=>a+b,0)/8);
  const now = new Date().toLocaleDateString("fr-BE",{day:"numeric",month:"long",year:"numeric"});
  function lbl(s){return s<34?"Niveau faible":s<67?"Niveau intermédiaire":"Niveau satisfaisant";}
  function col(s){return s<34?"#c81e1e":s<67?"#b45309":"#057a55";}
  function cls(oi){return oi===0?"low":oi===1?"mid":"";}

  let h = '<div class="print-header"><div class="print-company">🛡️ CA NIS2 Auditor — ' + company + '</div>';
  h += '<div class="print-meta">Audit NIS2 2024 — CyberAtaraxia — Selim JERBI · ' + (sector?sector+" · ":"") + (empSize?empSize+" · ":"") + now + '</div></div>';
  h += '<div style="margin-bottom:1.5rem;padding:1rem;border:2px solid #1a56db;border-radius:8px"><div style="font-size:11pt;font-weight:600;color:#374151;margin-bottom:.5rem">Score global</div><div class="print-global">' + global + '% — ' + lbl(global) + '</div></div>';
  h += '<div style="margin-bottom:1.5rem"><div style="font-weight:700;font-size:11pt;margin-bottom:.5rem">Résultats par thème</div>';
  THEMES.forEach(function(t,i){const s=scores[i];h+='<div class="print-score-bar"><div class="print-score-label">'+t.letter+' — '+t.name+'</div><div class="print-bar-wrap"><div class="print-bar-fill" style="width:'+s+'%;background:'+col(s)+'"></div></div><div class="print-score-val" style="color:'+col(s)+'">'+s+'%</div></div>';});
  h += '</div>';
  THEMES.forEach(function(t,i){
    h+='<div class="print-theme"><div class="print-theme-header">'+t.letter+' — '+t.name+' ('+scores[i]+'%)</div>';
    t.questions.forEach(function(q,qi){
      const oi=answers[i][qi]; if(oi===null)return;
      const opt=q.opts[oi]; const comment=comments[i][qi];
      h+='<div class="print-question"><div class="print-q-text">'+(qi+1)+'. '+q.text+'</div>';
      h+='<div class="print-answer '+cls(oi)+'">→ '+opt.label+(opt.desc?" : "+opt.desc:"")+'</div>';
      if(comment&&comment.trim())h+='<div class="print-comment">💬 '+comment.trim()+'</div>';
      h+='</div>';
    });
    h+='</div>';
  });
  return h;
}

function saveAsTxt() {
  const scores = THEMES.map((_, i) => getScore(i));
  const global = Math.round(scores.reduce((a,b)=>a+b,0)/8);
  const now = new Date().toLocaleDateString("fr-BE",{day:"numeric",month:"long",year:"numeric"});
  function lbl(s){return s<34?"Niveau faible":s<67?"Niveau intermédiaire":"Niveau satisfaisant";}
  let txt = "=================================================\n";
  txt += "CA NIS2 AUDITOR — NIS2 2024\n";
  txt += "CyberAtaraxia — Développeur : Selim JERBI\n";
  txt += "=================================================\n";
  txt += "Entreprise : " + company + "\n";
  if(sector) txt += "Secteur    : " + sector + "\n";
  if(empSize) txt += "Taille     : " + empSize + "\n";
  txt += "Date       : " + now + "\n=================================================\n\n";
  txt += "SCORE GLOBAL : " + global + "% — " + lbl(global) + "\n\n";
  txt += "RÉSULTATS PAR THÈME\n-------------------\n";
  THEMES.forEach(function(t,i){const s=scores[i];const bar="█".repeat(Math.round(s/10))+"░".repeat(10-Math.round(s/10));txt+=t.letter+" — "+t.name+"\n  ["+bar+"] "+s+"% — "+lbl(s)+"\n";});
  txt += "\n";
  THEMES.forEach(function(t,i){
    txt+="=================================================\nTHÈME "+t.letter+" — "+t.name+" ("+scores[i]+"%)\n=================================================\n";
    t.questions.forEach(function(q,qi){
      const oi=answers[i][qi]; if(oi===null)return;
      const opt=q.opts[oi]; const comment=comments[i][qi];
      txt+="\nQ"+(qi+1)+". "+q.text+"\n   → "+opt.label+(opt.desc?" : "+opt.desc:"")+  "\n";
      if(comment&&comment.trim())txt+="   💬 "+comment.trim()+"\n";
    });
    txt+="\n";
  });
  MODULES.forEach(function(mod){
    const data=moduleData[mod.id]; if(!data)return;
    const filled=Object.entries(data).filter(e=>e[1]&&e[1].trim()); if(!filled.length)return;
    txt+="=================================================\n"+mod.icon+" "+mod.title.toUpperCase()+"\n=================================================\n";
    filled.forEach(function(entry){const field=mod.fields.find(f=>f.id===entry[0]);if(!field)return;txt+="\n"+field.label+" :\n  "+entry[1].trim().replace(/\n/g,"\n  ")+"\n";});
    txt+="\n";
  });
  const aiContent = document.getElementById("r-ai").textContent.trim();
  if(aiContent&&!aiContent.includes("Génération")&&!aiContent.includes("Aucune clé")){
    txt+="=================================================\nANALYSE ET RECOMMANDATIONS (IA)\n=================================================\n\n"+aiContent+"\n";
  }
  const blob=new Blob([txt],{type:"text/plain;charset=utf-8"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");
  a.href=url; a.download="audit_nis2_"+(company||"audit").replace(/[^a-zA-Z0-9]/g,"_")+"_"+new Date().getFullYear()+".txt";
  a.click(); URL.revokeObjectURL(url);
}

document.getElementById("btn-print-report").addEventListener("click", function(){document.getElementById("print-answers-content").innerHTML="";window.print();});
document.getElementById("btn-print-answers").addEventListener("click", function(){document.getElementById("print-answers-content").innerHTML=buildPrintAnswers();window.print();});
document.getElementById("btn-save-txt").addEventListener("click", saveAsTxt);
document.getElementById("btn-restart").addEventListener("click", function(){
  company="";sector="";empSize="";currentTheme=0;initAnswers();moduleData={};
  const ci=document.getElementById("inp-company");if(ci)ci.value="";
  const si=document.getElementById("inp-sector");if(si)si.value="";

  document.getElementById("r-modules-wrap").style.display="none";
  document.getElementById("r-api-section").style.display="none";
  // Hide all screens and show welcome overlay
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById("s-intro").classList.add("active");
  document.getElementById("save-bar").style.display="none";
  const w=document.getElementById("s-welcome");
  w.style.display="flex";
  renderModulesList();
  window.scrollTo(0,0);
});

// ── PRINT CSS ─────────────────────────────────────────
// Print styles moved to css/styles.css


// ── 1. BACK TO QUESTIONS FROM REPORT ────────────────
document.getElementById("btn-back-to-questions").addEventListener("click", function() {
  renderTheme(currentTheme);
  renderThemeNav();
  show("s-questions");
});

// ── 2. SAVE JSON ON REPORT ───────────────────────────
document.getElementById("btn-save-json-report").addEventListener("click", saveToFile);

// ── 3. BACK TO INTRO FROM QUESTIONS ──────────────────
document.getElementById("btn-back-to-intro").addEventListener("click", function() {
  // Restore form fields with current data
  const ci = document.getElementById("inp-company");
  const si = document.getElementById("inp-sector");
  if (ci) ci.value = company;
  if (si) si.value = sector;

  renderModulesList();
  show("s-intro");
});

// ── 4. SAVE JSON ON INTRO (enabled only when company filled) ──────────────
const introSaveBtn = document.getElementById("btn-save-json-intro");
document.getElementById("inp-company").addEventListener("input", function() {
  if (this.value.trim()) {
    introSaveBtn.disabled = false;
    introSaveBtn.style.opacity = "1";
    introSaveBtn.style.cursor = "pointer";
  } else {
    introSaveBtn.disabled = true;
    introSaveBtn.style.opacity = ".4";
    introSaveBtn.style.cursor = "not-allowed";
  }
});
introSaveBtn.addEventListener("click", function() {
  // Sync form values before saving
  company = document.getElementById("inp-company").value.trim();
  sector = document.getElementById("inp-sector").value.trim();
  empSize = "";
  saveToFile();
});

// ── 5. FLOATING QUESTION TRACKER ─────────────────────
function renderTracker() {
  const content = document.getElementById("tracker-content");
  if (!content) return;
  let html = "";
  THEMES.forEach(function(t, ti) {
    const answered = answers[ti].filter(a => a !== null).length;
    const total = t.questions.length;
    const allDone = answered === total;
    const none = answered === 0;
    const statusColor = allDone ? "#057a55" : none ? "#6b7280" : "#b45309";
    const statusBg = allDone ? "#f0fdf4" : none ? "#f9fafb" : "#fffbeb";
    html += `<div style="padding:.5rem .75rem;border-bottom:1px solid #f3f4f6;background:${statusBg}">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px;cursor:pointer" onclick="jumpToTheme(${ti})">
        <span style="font-size:.8rem;font-weight:700;color:${statusColor}">${t.letter} — ${t.name}</span>
        <span style="font-size:.72rem;color:${statusColor};font-weight:600">${answered}/${total}</span>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:3px">`;
    t.questions.forEach(function(q, qi) {
      const ans = answers[ti][qi];
      let dot_color, dot_title;
      if (ans === null) {
        dot_color = "#d1d5db"; dot_title = "Non répondu";
      } else if (ans === 0) {
        dot_color = "#ef4444"; dot_title = "Non : " + q.text.slice(0, 40);
      } else if (ans === 1) {
        dot_color = "#f59e0b"; dot_title = "Partiel : " + q.text.slice(0, 40);
      } else {
        dot_color = "#10b981"; dot_title = "Oui : " + q.text.slice(0, 40);
      }
      html += `<div title="${dot_title}" onclick="jumpToQuestion(${ti},${qi})" style="width:14px;height:14px;border-radius:3px;background:${dot_color};cursor:pointer;flex-shrink:0"></div>`;
    });
    html += `</div></div>`;
  });
  content.innerHTML = html;
}

function jumpToTheme(ti) {
  currentTheme = ti;
  renderTheme(ti);
  renderThemeNav();
  show("s-questions");
  document.getElementById("tracker-panel").style.display = "none";
}

function jumpToQuestion(ti, qi) {
  currentTheme = ti;
  renderTheme(ti);
  renderThemeNav();
  show("s-questions");
  document.getElementById("tracker-panel").style.display = "none";
  setTimeout(function() {
    const el = document.getElementById("qb-" + qi);
    if (el) el.scrollIntoView({behavior: "smooth", block: "center"});
  }, 100);
}

document.getElementById("tracker-btn").addEventListener("click", function() {
  const panel = document.getElementById("tracker-panel");
  if (panel.style.display === "none") {
    renderTracker();
    panel.style.display = "block";
    this.style.transform = "scale(1.1)";
  } else {
    panel.style.display = "none";
    this.style.transform = "scale(1)";
  }
});

document.getElementById("tracker-close").addEventListener("click", function() {
  document.getElementById("tracker-panel").style.display = "none";
  document.getElementById("tracker-btn").style.transform = "scale(1)";
});

// Show/hide tracker bubble based on screen
function updateTrackerVisibility(screenId) {
  const bubble = document.getElementById("tracker-bubble");
  bubble.style.display = (screenId === "s-questions" || screenId === "s-modules-interlude") ? "block" : "none";
  if (screenId !== "s-questions") {
    const panel = document.getElementById("tracker-panel");
    if (panel) panel.style.display = "none";
  }
}

// Patch show() to update tracker
const _origShow = show;
show = function(id) {
  _origShow(id);
  updateTrackerVisibility(id);
};

// ── 6. CA BRANDING IN TXT & PRINT ──────────────────
// Patch saveAsTxt to add CyberAtaraxia branding
const _origSaveAsTxt = saveAsTxt;
saveAsTxt = function() {
  // Override is done inline in the function - see below
  _origSaveAsTxt();
};

// Re-define saveAsTxt with branding
saveAsTxt = function() {
  const scores = THEMES.map(function(_, i) { return getScore(i); });
  const global = Math.round(scores.reduce(function(a,b){return a+b;},0)/8);
  const now = new Date().toLocaleDateString("fr-BE",{day:"numeric",month:"long",year:"numeric"});
  function lbl(s){return s<34?"Niveau faible":s<67?"Niveau intermédiaire":"Niveau satisfaisant";}
  let txt = "=================================================\n";
  txt += "CA NIS2 AUDITOR — NIS2 2024\n";
  txt += "=================================================\n";
  txt += "Logiciel         : CA NIS2 Auditor\n";
  txt += "Développeur      : Selim JERBI — CyberAtaraxia\n";
  txt += "Licence          : Open Source\n";
  txt += "-------------------------------------------------\n";
  txt += "Entreprise auditée : " + company + "\n";
  if(sector) txt += "Secteur            : " + sector + "\n";
  if(empSize) txt += "Taille             : " + empSize + "\n";
  txt += "Date               : " + now + "\n";
  txt += "=================================================\n\n";
  txt += "SCORE GLOBAL : " + global + "% — " + lbl(global) + "\n\n";
  txt += "RÉSULTATS PAR THÈME\n-------------------\n";
  THEMES.forEach(function(t,i){
    const s=scores[i];
    const bar="█".repeat(Math.round(s/10))+"░".repeat(10-Math.round(s/10));
    txt+=t.letter+" — "+t.name+"\n  ["+bar+"] "+s+"% — "+lbl(s)+"\n";
  });
  txt += "\n";
  THEMES.forEach(function(t,i){
    txt+="=================================================\n";
    txt+="THÈME "+t.letter+" — "+t.name+" ("+scores[i]+"%)\n";
    txt+="=================================================\n";
    t.questions.forEach(function(q,qi){
      const oi=answers[i][qi]; if(oi===null)return;
      const opt=q.opts[oi]; const comment=comments[i][qi];
      txt+="\nQ"+(qi+1)+". "+q.text+"\n";
      txt+="   → "+opt.label+(opt.desc?" : "+opt.desc:"")+"\n";
      if(comment&&comment.trim()) txt+="   💬 "+comment.trim()+"\n";
    });
    txt+="\n";
  });
  MODULES.forEach(function(mod){
    const data=moduleData[mod.id]; if(!data)return;
    const filled=Object.entries(data).filter(function(e){return e[1]&&e[1].trim();}); if(!filled.length)return;
    txt+="=================================================\n";
    txt+=mod.icon+" "+mod.title.toUpperCase()+"\n";
    txt+="=================================================\n";
    filled.forEach(function(entry){
      const field=mod.fields.find(function(f){return f.id===entry[0];});
      if(!field)return;
      txt+="\n"+field.label+" :\n  "+entry[1].trim().replace(/\n/g,"\n  ")+"\n";
    });
    txt+="\n";
  });
  const aiContent=document.getElementById("r-ai").textContent.trim();
  if(aiContent&&!aiContent.includes("Génération")&&!aiContent.includes("Aucune clé")){
    txt+="=================================================\n";
    txt+="ANALYSE ET RECOMMANDATIONS (IA)\n";
    txt+="=================================================\n\n";
    txt+=aiContent+"\n";
  }
  txt+="\n=================================================\n";
  txt+="Ce rapport a été généré par CA NIS2 Auditor.\n";
  txt+="Logiciel open source CyberAtaraxia développé par Selim JERBI.\n";
  txt+="=================================================\n";
  const blob=new Blob([txt],{type:"text/plain;charset=utf-8"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");
  a.href=url;
  a.download="audit_nis2_"+(company||"audit").replace(/[^a-zA-Z0-9]/g,"_")+"_"+new Date().getFullYear()+".txt";
  a.click();
  URL.revokeObjectURL(url);
};

// Patch buildPrintAnswers to include CyberAtaraxia branding
const _origBuildPrintAnswers = buildPrintAnswers;
buildPrintAnswers = function() {
  let h = _origBuildPrintAnswers();
  // Add footer branding
  h += `<div style="margin-top:2rem;padding-top:1rem;border-top:2px solid #1a56db;font-size:9pt;color:#6b7280;text-align:center">
    Audit réalisé par <strong>CyberAtaraxia</strong> — Consultant : <strong>Selim JERBI</strong><br>
    Logiciel CA NIS2 Auditor 2025 créé par <strong>Selim JERBI — CyberAtaraxia</strong>
  </div>`;
  return h;
};



// ── INIT ──────────────────────────────────────────────
renderModulesList();
