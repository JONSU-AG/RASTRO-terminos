import pypdf

reader = pypdf.PdfReader('public/assets/TEMARIO-y-MATRIZ-ADMISION-2027.pdf')
out = []
for i, page in enumerate(reader.pages):
    txt = page.extract_text() or ''
    if any(k in txt.upper() for k in ['LITERATURA', 'OBRA', 'ARGUEDAS', 'VALLEJO', 'VARGAS LLOSA', 'ALEGRÍA', 'SÓFOCLES', 'KAFKA', 'QUIJOTE', 'ODISEA', 'ILÍADA']):
        out.append(f"=== PAGE {i+1} ===\n" + txt)

with open('scratch_literatura_temario.txt', 'w', encoding='utf-8') as f:
    f.write('\n\n'.join(out))

print(f"Extracted {len(out)} pages with literature references.")
