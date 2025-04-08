import jsPDF from 'jspdf';
import 'jspdf-autotable';

/**
 * Exportar un informe individual a PDF
 */
export const exportarInformePDF = (informe) => {
  try {
    // Crear documento PDF
    const doc = new jsPDF();
    
    // Colores
    const colorPrimario = '#3498db';
    
    // Encabezado
    doc.setFillColor(colorPrimario);
    doc.rect(0, 0, 210, 30, 'F');
    
    // Título - Texto en blanco
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('AlhambraCRM', 105, 15, { align: 'center' });
    
    // Subtítulo
    doc.setFontSize(14);
    doc.text(`Informe: ${informe.titulo || 'Sin título'}`, 105, 25, { align: 'center' });
    
    // Contenido
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    
    // Metadatos
    let y = 40;
    doc.setFont('helvetica', 'bold');
    doc.text('Fecha:', 20, y);
    doc.setFont('helvetica', 'normal');
    doc.text(formatearFecha(informe.fechaActualizacion || informe.fechaCreacion), 60, y);
    
    y += 10;
    doc.setFont('helvetica', 'bold');
    doc.text('Autor:', 20, y);
    doc.setFont('helvetica', 'normal');
    doc.text(informe.autor || 'No especificado', 60, y);
    
    y += 10;
    doc.setFont('helvetica', 'bold');
    doc.text('Tipo:', 20, y);
    doc.setFont('helvetica', 'normal');
    doc.text(informe.tipo || 'No especificado', 60, y);
    
    if (informe.proyecto) {
      y += 10;
      doc.setFont('helvetica', 'bold');
      doc.text('Proyecto:', 20, y);
      doc.setFont('helvetica', 'normal');
      doc.text(informe.proyecto, 60, y);
    }
    
    // Descripción
    y += 20;
    doc.setFont('helvetica', 'bold');
    doc.text('Descripción:', 20, y);
    
    y += 10;
    doc.setFont('helvetica', 'normal');
    const descripcion = informe.descripcion || 'No hay descripción disponible';
    const descripcionLineas = doc.splitTextToSize(descripcion, 170);
    doc.text(descripcionLineas, 20, y);
    
    // Contenido
    y += descripcionLineas.length * 7 + 10;
    doc.setFont('helvetica', 'bold');
    doc.text('Contenido:', 20, y);
    
    y += 10;
    doc.setFont('helvetica', 'normal');
    const contenido = informe.contenido || 'No hay contenido disponible';
    const contenidoLineas = doc.splitTextToSize(contenido, 170);
    doc.text(contenidoLineas, 20, y);
    
    // Pie de página
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generado el ${new Date().toLocaleDateString('es-ES')}`, 20, 280);
    doc.text('AlhambraCRM', 105, 280, { align: 'center' });
    doc.text('Página 1', 190, 280, { align: 'right' });
    
    // Guardar PDF
    doc.save(`Informe_${informe.titulo.replace(/\s+/g, '_')}.pdf`);
    return true;
  } catch (error) {
    console.error('Error al exportar informe a PDF:', error);
    throw new Error('Error al generar el PDF');
  }
};

/**
 * Exportar lista de informes a PDF
 */
export const exportarListaInformesPDF = (informes) => {
  try {
    // Validación básica
    if (!Array.isArray(informes) || informes.length === 0) {
      throw new Error('No hay informes para exportar');
    }
    
    // Crear documento PDF
    const doc = new jsPDF();
    
    // Colores
    const colorPrimario = '#3498db';
    
    // Encabezado
    doc.setFillColor(colorPrimario);
    doc.rect(0, 0, 210, 30, 'F');
    
    // Título - Texto en blanco
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('AlhambraCRM', 105, 15, { align: 'center' });
    
    // Subtítulo
    doc.setFontSize(14);
    doc.text('Listado de Informes', 105, 25, { align: 'center' });
    
    // Información básica
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Total de informes: ${informes.length}`, 20, 40);
    doc.text(`Fecha de generación: ${new Date().toLocaleDateString('es-ES')}`, 20, 50);
    
    // Tabla simple
    try {
      // Datos para la tabla
      const headers = ['Título', 'Tipo', 'Autor'];
      const rows = informes.map(informe => [
        informe.titulo || 'Sin título',
        informe.tipo || 'Sin tipo',
        informe.autor || 'Sin autor'
      ]);
      
      // Crear tabla
      doc.autoTable({
        head: [headers],
        body: rows,
        startY: 60,
        theme: 'grid',
        headStyles: {
          fillColor: colorPrimario,
          textColor: [255, 255, 255],
          fontStyle: 'bold'
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245]
        }
      });
    } catch (tableError) {
      // Si falla la tabla, mostrar mensaje
      console.error('Error al generar tabla:', tableError);
      doc.text('No se pudo generar la tabla de informes.', 20, 60);
    }
    
    // Pie de página
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generado el ${new Date().toLocaleDateString('es-ES')}`, 20, 280);
    doc.text('AlhambraCRM', 105, 280, { align: 'center' });
    doc.text('Página 1', 190, 280, { align: 'right' });
    
    // Guardar PDF
    doc.save('Listado_Informes.pdf');
    return true;
  } catch (error) {
    console.error('Error al exportar lista de informes a PDF:', error);
    throw new Error('Error al generar el PDF');
  }
};

/**
 * Exportar un informe a Excel
 */
export const exportarInformeExcel = (informe) => {
  try {
    // Crear un array con los datos del informe
    const datos = [
      ['AlhambraCRM - Informe'],
      ['Título', informe.titulo || 'Sin título'],
      ['Autor', informe.autor || 'Sin autor'],
      ['Tipo', informe.tipo || 'Sin tipo'],
      ['Fecha', formatearFecha(informe.fechaActualizacion || informe.fechaCreacion)],
      ['Proyecto', informe.proyecto || 'No especificado'],
      [''],
      ['Descripción'],
      [informe.descripcion || 'No hay descripción disponible'],
      [''],
      ['Contenido'],
      [informe.contenido || 'No hay contenido disponible']
    ];
    
    // Convertir a CSV
    const csv = datos.map(fila => fila.join(',')).join('\n');
    
    // Crear blob y descargar
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    // Crear enlace y simular clic
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Informe_${informe.titulo.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return true;
  } catch (error) {
    console.error('Error al exportar informe a Excel:', error);
    throw new Error('Error al generar el archivo Excel');
  }
};

/**
 * Exportar lista de informes a Excel
 */
export const exportarListaInformesExcel = (informes) => {
  try {
    // Validación básica
    if (!Array.isArray(informes) || informes.length === 0) {
      throw new Error('No hay informes para exportar');
    }
    
    // Crear cabecera
    const cabecera = ['Título', 'Tipo', 'Autor', 'Fecha', 'Proyecto'];
    
    // Crear filas
    const filas = informes.map(informe => [
      informe.titulo || 'Sin título',
      informe.tipo || 'Sin tipo',
      informe.autor || 'Sin autor',
      formatearFecha(informe.fechaActualizacion || informe.fechaCreacion),
      informe.proyecto || 'No especificado'
    ]);
    
    // Unir todo
    const datos = [
      ['AlhambraCRM - Listado de Informes'],
      ['Fecha de generación', new Date().toLocaleDateString('es-ES')],
      [''],
      cabecera,
      ...filas
    ];
    
    // Convertir a CSV
    const csv = datos.map(fila => fila.join(',')).join('\n');
    
    // Crear blob y descargar
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    // Crear enlace y simular clic
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Listado_Informes.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return true;
  } catch (error) {
    console.error('Error al exportar lista de informes a Excel:', error);
    throw new Error('Error al generar el archivo Excel');
  }
};

/**
 * Formatear fecha
 */
const formatearFecha = (fechaStr) => {
  if (!fechaStr) return '-';
  
  try {
    const fecha = new Date(fechaStr);
    if (isNaN(fecha.getTime())) return '-';
    
    return fecha.toLocaleDateString('es-ES');
  } catch (error) {
    return '-';
  }
};

export default {
  exportarInformePDF,
  exportarListaInformesPDF,
  exportarInformeExcel,
  exportarListaInformesExcel
};
