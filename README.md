# 🎨 Bars Frontend (React + Vite)

Frontend del aplikacije VSŠ Album, zgrajen s knjižnico React in orodjem Vite. Aplikacija omogoča interakcijo z backend API-jem za upravljanje lokacij, komentarjev in uporabniških računov.

## 🚀 Funkcionalnosti

### Avtentikacija
- Prijava in registracija uporabnikov.
- Shranjevanje JWT žetona v `localStorage`.
- Zaščitene poti (samo za prijavljene uporabnike).

### Lokacije
- Prikaz seznama vseh lokacij na domači strani (kartice s slikami).
- Podroben ogled posamezne lokacije z galerijo slik (carousel).
- Dodajanje novih lokacij (vključno z nalaganjem več slik hkrati).
- Urejanje in brisanje lokacij (vidno samo lastniku).

### Komentarji
- Prikaz komentarjev na strani lokacije.
- Dodajanje novih komentarjev.
- Brisanje lastnih komentarjev.

### Uporabniški vmesnik
- Odziven dizajn (uporaba Bootstrap 5).
- Dinamična navigacija (prikaz povezav glede na status prijave).

## 🛠️ Tehnologije
- **React:** Knjižnica za gradnjo uporabniških vmesnikov.
- **Vite:** Orodje za hiter razvoj in gradnjo.
- **React Router:** Upravljanje navigacije in poti.
- **Axios:** HTTP klient za komunikacijo z API-jem.
- **Bootstrap 5:** CSS ogrodje za stiliziranje.

## 📦 Namestitev in Zagon

### Predpogoji
- Node.js (verzija 16 ali novejša)
- Delujoč Bars Backend (mora teči na portu 3000 ali ustrezno konfiguriran).

### 1. Kloniranje repozitorija
```bash
git clone <URL_TVOJEGA_REPOZITORIJA>
cd bars-frontend
```
### 2. Namestitev odvisnosti
```bash
npm install
```
### 3. Zagon aplikacije
```bash
npm run dev
```
Aplikacija bo privzeto dosegljiva na `http://localhost:5173`.

## 📂 Struktura Projekta

```text
src/
├── components/       # Reusable komponente (Card, Header, Footer...)
├── context/          # React Context (AuthContext za prijavo)
├── interfaces/       # TypeScript vmesniki (Location, User, Comment...)
├── pages/            # Strani aplikacije (Home, Login, Location...)
├── services/         # API servisi (axiosInstance)
├── App.tsx           # Glavna komponenta z usmerjanjem (routing)
└── main.tsx          # Vstopna točka aplikacije
```

### Ključne strani
- **Domov (`/`):** Prikazuje album vseh lokacij.
- **Prijava/Registracija (`/login`, `/register`):** Obrazci za avtentikacijo.
- **Podrobnosti Lokacije (`/locations/:id`):** Prikaz podatkov, galerije in komentarjev.
- **Dodaj Lokacijo (`/add-location`):** Obrazec za ustvarjanje nove lokacije.
- **Uredi Lokacijo (`/locations/:id/edit`):** Obrazec za urejanje (samo za lastnike).