# 📚 Guia Completo: Diário de Mídia Digital em JavaScript

## 🎯 Você tem DUAS opções para usar este projeto:

---

## ✅ OPÇÃO 1: React + JavaScript (SEM TypeScript)

### 📁 Arquivos da Versão React JS:
- `App.jsx` - Componente principal
- `components/MediaCard.jsx` - Card de mídia
- `components/AddMediaDialog.jsx` - Modal para adicionar
- `components/MediaFilters.jsx` - Filtros laterais
- `components/MediaGrid.jsx` - Grade de mídia
- `styles/globals.css` - Estilos CSS
- `components/ui/` - Componentes ShadCN (prontos para usar)

### 🚀 Como usar no VS Code:

#### 1. **Baixe/Clone o projeto**
```bash
cd sua-pasta-do-projeto
code .
```

#### 2. **Instale as dependências** (se ainda não instalou)
```bash
npm install
# ou
yarn install
```

#### 3. **Execute o projeto**
```bash
npm run dev
# ou
yarn dev
```

#### 4. **Abra no navegador**
- Geralmente abre em: `http://localhost:5173` ou `http://localhost:3000`

### 📝 Estrutura do Código React JS:

```javascript
// App.jsx - EXEMPLO DE CÓDIGO SEM TYPESCRIPT
import { useState, useMemo } from 'react';

export default function App() {
  // Estados (sem tipos TypeScript!)
  const [media, setMedia] = useState(initialMedia);
  const [activeType, setActiveType] = useState('all');
  
  // Funções normais em JavaScript
  const handleAddMedia = (newMedia) => {
    const id = Date.now().toString();
    setMedia(prev => [...prev, { ...newMedia, id }]);
  };
  
  return (
    <div>
      {/* Seu JSX aqui */}
    </div>
  );
}
```

### ✅ Vantagens da Opção 1:
- ✅ Usa React (você conhece!)
- ✅ **SEM TypeScript** - só JavaScript puro
- ✅ Componentizado (fácil de manter)
- ✅ Usa Tailwind CSS (classes prontas)
- ✅ Componentes ShadCN (UI profissional)
- ✅ Pode adicionar mais bibliotecas facilmente

### 📦 Bibliotecas Usadas:
- **React** - Framework de componentes
- **Tailwind CSS** - Estilos utilitários
- **Lucide React** - Ícones modernos
- **Sonner** - Notificações toast
- **Radix UI** - Componentes acessíveis (base do ShadCN)

---

## ✅ OPÇÃO 2: HTML/CSS/JavaScript Puro (SEM frameworks)

### 📁 Arquivos da Versão Pura:
- `index.html` - Estrutura HTML completa
- `styles.css` - TODO o CSS do projeto
- `script.js` - Toda a lógica JavaScript

### 🚀 Como usar:

#### 1. **Copie os 3 arquivos para uma pasta**
```
meu-projeto/
├── index.html
├── styles.css
└── script.js
```

#### 2. **Abra no navegador**
- **Opção A:** Duplo clique em `index.html`
- **Opção B:** No VS Code, instale "Live Server" e clique com botão direito → "Open with Live Server"
- **Opção C:** Use um servidor local Python:
  ```bash
  python -m http.server 8000
  # Abra: http://localhost:8000
  ```

### 📝 Estrutura do Código HTML/CSS/JS:

```javascript
// script.js - EXEMPLO DE CÓDIGO PURO
let mediaData = [
  {
    id: '1',
    title: 'Duna',
    type: 'movie',
    status: 'completed',
    rating: 5
  }
];

// Funções JavaScript puras
function addMedia(mediaItem) {
  const newMedia = {
    ...mediaItem,
    id: generateId(),
  };
  mediaData.push(newMedia);
  renderMediaGrid();
}

// Event listeners
document.getElementById('addMediaBtn').addEventListener('click', () => {
  modal.classList.add('show');
});
```

### ✅ Vantagens da Opção 2:
- ✅ **100% JavaScript puro** (nada de frameworks)
- ✅ Não precisa instalar NADA
- ✅ Funciona offline (exceto Font Awesome)
- ✅ Abra direto no navegador
- ✅ Fácil de entender e modificar
- ✅ Sem build, sem npm, sem Node.js

### 📦 Dependências Externas (via CDN):
- **Font Awesome** - Ícones (carregado do CDN)

---

## 🔄 Comparação das Opções

| Característica | React + JS | HTML/CSS/JS Puro |
|---------------|------------|------------------|
| **Complexidade** | Média | Baixa |
| **Instalação** | Precisa npm/yarn | Nenhuma |
| **Frameworks** | React + Tailwind | Nenhum |
| **Aprendizado** | React básico | JavaScript básico |
| **Manutenção** | Componentizada | Tudo em poucos arquivos |
| **Performance** | Ótima | Ótima |
| **Escalabilidade** | Alta | Média |
| **Para iniciantes** | Requer conhecimento React | ✅ **IDEAL** |
| **Para produção** | ✅ **IDEAL** | Bom para projetos pequenos |

---

## 💡 Qual Opção Escolher?

### Escolha **OPÇÃO 1 (React + JS)** se:
✅ Você sabe o básico de React  
✅ Quer aprender React melhor  
✅ Planeja expandir muito o projeto  
✅ Quer usar componentes reutilizáveis  
✅ Tem Node.js instalado  

### Escolha **OPÇÃO 2 (HTML/CSS/JS Puro)** se:
✅ Você está começando  
✅ Não quer instalar nada  
✅ Prefere simplicidade  
✅ Quer entender tudo que está acontecendo  
✅ Projeto pequeno/médio  

---

## 📖 Como Continuar o Desenvolvimento

### Para AMBAS as opções:

#### 1. **Adicionar Persistência de Dados (localStorage)**

**React JS:**
```javascript
// App.jsx
import { useState, useEffect } from 'react';

export default function App() {
  const [media, setMedia] = useState(() => {
    const saved = localStorage.getItem('mediaData');
    return saved ? JSON.parse(saved) : initialMedia;
  });

  useEffect(() => {
    localStorage.setItem('mediaData', JSON.stringify(media));
  }, [media]);
}
```

**JavaScript Puro:**
```javascript
// script.js
// Carregar dados
function loadData() {
  const saved = localStorage.getItem('mediaData');
  return saved ? JSON.parse(saved) : initialMedia;
}

// Salvar dados
function saveData() {
  localStorage.setItem('mediaData', JSON.stringify(mediaData));
}

// Chamar saveData() após cada modificação
function addMedia(mediaItem) {
  mediaData.push(mediaItem);
  saveData(); // Adicione isso
  renderMediaGrid();
}
```

---

#### 2. **Adicionar Campo de Busca**

**React JS:**
```javascript
const [searchTerm, setSearchTerm] = useState('');

const filteredMedia = useMemo(() => {
  return media.filter(item => {
    const matchesSearch = item.title.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = activeType === 'all' || item.type === activeType;
    return matchesSearch && matchesType;
  });
}, [media, searchTerm, activeType]);

// No JSX:
<Input 
  placeholder="Buscar..." 
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
```

**JavaScript Puro:**
```javascript
// Adicione no HTML:
<input type="text" id="searchInput" placeholder="Buscar...">

// No script.js:
let searchTerm = '';

document.getElementById('searchInput').addEventListener('input', (e) => {
  searchTerm = e.target.value.toLowerCase();
  renderMediaGrid();
});

function getFilteredMedia() {
  return mediaData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm);
    const matchesType = state.activeType === 'all' || item.type === state.activeType;
    return matchesSearch && matchesType;
  });
}
```

---

#### 3. **Adicionar Função de Deletar**

**React JS:**
```javascript
const handleDelete = (id) => {
  if (confirm('Tem certeza que deseja excluir?')) {
    setMedia(prev => prev.filter(item => item.id !== id));
    toast.success('Mídia removida!');
  }
};

// No MediaCard.jsx:
<Button 
  variant="destructive" 
  onClick={() => onDelete(media.id)}
>
  Excluir
</Button>
```

**JavaScript Puro:**
```javascript
function deleteMedia(id) {
  if (confirm('Tem certeza que deseja excluir?')) {
    mediaData = mediaData.filter(item => item.id !== id);
    showToast('Mídia removida!');
    renderMediaGrid();
    updateFilters();
  }
}

// No HTML do card:
<button onclick="deleteMedia('${media.id}')">Excluir</button>
```

---

#### 4. **Integrar API do TMDB (The Movie Database)**

**Cadastre-se:** https://www.themoviedb.org/settings/api

**React JS:**
```javascript
const searchTMDB = async (query) => {
  const API_KEY = 'SUA_CHAVE_AQUI';
  const response = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}&language=pt-BR`
  );
  const data = await response.json();
  return data.results;
};

// Use no AddMediaDialog:
const [searchResults, setSearchResults] = useState([]);

const handleSearch = async () => {
  const results = await searchTMDB(formData.title);
  setSearchResults(results);
};
```

**JavaScript Puro:**
```javascript
async function searchTMDB(query) {
  const API_KEY = 'SUA_CHAVE_AQUI';
  const url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}&language=pt-BR`;
  
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}

// Event listener:
document.getElementById('searchBtn').addEventListener('click', async () => {
  const query = document.getElementById('mediaTitle').value;
  const results = await searchTMDB(query);
  displaySearchResults(results);
});
```

---

## 🎓 Recursos para Aprender Mais

### JavaScript Básico:
- [MDN Web Docs - JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [JavaScript.info](https://javascript.info/)

### React JS:
- [Documentação Oficial React](https://react.dev/)
- [React para Iniciantes (YouTube - Matheus Battisti)](https://www.youtube.com/watch?v=FXqX7oof0I0)

### Tailwind CSS:
- [Documentação Tailwind](https://tailwindcss.com/docs)
- [Tailwind CSS Crash Course](https://www.youtube.com/watch?v=UBOj6rqRUME)

### APIs:
- [The Movie Database (TMDB) API](https://developers.themoviedb.org/3)
- [Google Books API](https://developers.google.com/books/docs/v1/getting_started)

---

## 🐛 Solução de Problemas

### React não funciona:
```bash
# Reinstale dependências
rm -rf node_modules package-lock.json
npm install

# Limpe o cache
npm cache clean --force
```

### HTML/CSS/JS não carrega estilos:
- Verifique se os 3 arquivos estão na mesma pasta
- Abra o Console (F12) e veja se há erros
- Verifique os caminhos dos arquivos

### Imagens não aparecem:
- Verifique sua conexão com internet
- URLs do Unsplash podem expirar (substitua por outras)

---

## 📞 Precisa de Ajuda?

Se tiver dúvidas sobre:
- Como adicionar uma funcionalidade
- Como modificar o código
- Erros que aparecem
- Boas práticas

Só perguntar! Estou aqui para ajudar! 🚀

---

## 📝 Resumo Final

✅ **Opção 1 (React + JS):** Melhor para aprender React e projetos escaláveis  
✅ **Opção 2 (HTML/CSS/JS):** Melhor para iniciantes e simplicidade  

**Ambas as opções estão 100% funcionais e prontas para usar!**

Escolha a que você se sentir mais confortável e comece a desenvolver! 🎉
