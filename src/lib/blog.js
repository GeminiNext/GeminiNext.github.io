// Utility to parse frontmatter without heavy dependencies
const parseFrontmatter = (fileContent) => {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = fileContent.match(frontmatterRegex);
    
    if (!match) return { data: {}, content: fileContent };
    
    const yamlBlock = match[1];
    const content = match[2];
    const data = {};
    
    yamlBlock.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length > 0) {
            const value = valueParts.join(':').trim();
            // Basic type conversion
            if (value.startsWith('"') && value.endsWith('"')) {
                data[key.trim()] = value.slice(1, -1);
            } else {
                data[key.trim()] = value;
            }
        }
    });
    
    return { data, content };
};

const postFiles = import.meta.glob('/src/content/blog/*.md', { as: 'raw', eager: true });

export const getAllPosts = () => {
    return Object.keys(postFiles).map((path) => {
        const rawContent = postFiles[path];
        const { data } = parseFrontmatter(rawContent);
        const fileName = path.split('/').pop().replace('.md', '');
        
        return {
            ...data,
            id: data.id || fileName,
        };
    }).sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const getPostById = (id) => {
    const path = Object.keys(postFiles).find(p => p.endsWith(`${id}.md`));
    if (!path) return null;
    
    const rawContent = postFiles[path];
    const { data, content } = parseFrontmatter(rawContent);
    
    return {
        ...data,
        id: data.id || id,
        content,
    };
};
