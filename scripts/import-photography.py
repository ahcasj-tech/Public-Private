"""Import the owner's photography folder as web images without changing originals."""
import argparse
import json
from pathlib import Path
from PIL import Image, ImageOps

PHOTOS = [
    ('_DSC6060.JPG', '建筑立面'),
    ('9月28日18：18醴陵国瓷大道.jpg', '9月28日18：18 · 醴陵国瓷大道'),
    ('微信图片_20240628122831.jpg', '枝叶与蓝天'),
    ('_DSC0434.JPG', '门廊与光'),
    ('_DSC0625.JPG', '晾晒的面条'),
    ('_DSC0801.jpg', '池中浮叶'),
    ('_DSC0809.JPG', '木桶与水瓢'),
    ('_DSC1236.jpg', '草地上的牛'),
    ('_DSC1425.jpg', '湖面与远山'),
    ('_DSC1435.jpg', '山壁与公路'),
    ('_DSC1720.JPG', '拱桥与倒影'),
    ('_DSC1738.jpg', '田间青绿'),
    ('_DSC1740.JPG', '田野与云'),
    ('_DSC5827.jpg', '飞鸟'),
    ('_DSC5918.jpg', '雾中的高楼'),
    ('_DSC6057.jpg', '停泊的小船'),
    ('_DSC6674.jpg', '林荫道路'),
    ('_DSC8237-2.jpg', '林间草木'),
    ('_DSC8238.jpg', '枝叶之间的天空'),
    ('DSC_0570.jpg', '铁塔与电线'),
    ('DSC_1589.jpg', '夕阳下的屋顶'),
    ('DSC_1593.jpg', '山间光束'),
    ('DSC_1689.jpg', '窗格与光影'),
    ('微信图片_20240519144711.jpg', '夜色剪影'),
    ('陶瓷艺术设计2304刘丹钰《向上看》.jpg', '向上看'),
]

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('source', type=Path)
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    dest = root / 'public' / 'assets' / 'works'
    available = {p.name for p in args.source.iterdir() if p.suffix.lower() in {'.jpg', '.jpeg', '.png'}}
    assert available == {name for name, _ in PHOTOS}, 'Source photos do not match the import list'
    gallery = []
    total_input = total_output = 0
    for i, (filename, label) in enumerate(PHOTOS, 1):
        source = args.source / filename
        total_input += source.stat().st_size
        with Image.open(source) as original:
            image = ImageOps.exif_transpose(original).convert('RGB')
            for suffix, limit, quality in [('', 2400, 86), ('-thumb', 320, 78)]:
                variant = image.copy()
                variant.thumbnail((limit, limit), Image.Resampling.LANCZOS)
                output = dest / f'photo-{i}{suffix}.webp'
                variant.save(output, 'WEBP', quality=quality, method=6)
                total_output += output.stat().st_size
            gallery.append({'index': i, 'label': label})
    payload = json.dumps(gallery, ensure_ascii=False, indent=2)
    (root / 'src' / 'photography.json').write_text(payload + '\n', encoding='utf-8')
    print(json.dumps({'photos': len(gallery), 'source_bytes': total_input, 'web_bytes': total_output}, ensure_ascii=False))

if __name__ == '__main__':
    main()
