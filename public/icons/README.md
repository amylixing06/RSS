# PWA图标

为了让PWA功能完整运行，您需要在此目录中添加以下图标文件：

1. `icon-192x192.png` - 192x192像素的应用图标
2. `icon-512x512.png` - 512x512像素的应用图标
3. `icon-maskable-192x192.png` - 192x192像素的可遮罩图标（带安全区域的图标）
4. `icon-maskable-512x512.png` - 512x512像素的可遮罩图标（带安全区域的图标）

您可以使用现有的应用图标作为基础，或者创建新的图标。

## 可遮罩图标的创建指南

可遮罩图标需要遵循特定的格式，以确保在不同设备上显示良好。图标的重要内容应该位于中心的圆形安全区域内（通常是整个图标尺寸的60%），外围留出足够的空间用于各种形状的裁剪。

## 临时解决方案

如果您暂时没有适合的图标，可以将placeholder图标重命名并复制到所需文件名，然后在未来替换为正式的应用图标。

```bash
# 从项目根目录执行
cp public/placeholder-logo.png public/icons/icon-192x192.png
cp public/placeholder-logo.png public/icons/icon-512x512.png
cp public/placeholder-logo.png public/icons/icon-maskable-192x192.png
cp public/placeholder-logo.png public/icons/icon-maskable-512x512.png
```

请注意，上述命令只是临时解决方案，建议使用正确尺寸和设计的图标文件。 