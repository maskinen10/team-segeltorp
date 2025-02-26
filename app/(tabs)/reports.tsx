```tsx
import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Platform, Share } from 'react-native';
import { Calendar, Download, ChevronDown, FileText } from 'lucide-react-native';
import * as Print from 'expo-print';
import { useSalesStore } from '@/stores/sales-store';
import { useTestDriveStore } from '@/stores/test-drive-store';
import Colors from '@/constants/colors';
import { Strings } from '@/constants/strings';
import { generateReportHTML } from '@/utils/report-generator';
import DateRangePicker from '@/components/DateRangePicker';

type DateRange = 'week' | 'month' | 'custom';

export default function ReportsScreen() {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState('week');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isGenerating, setIsGenerating] = useState(false);

  const { sales, salesPeople } = useSalesStore();
  const { testDrives } = useTestDriveStore();

  const handleGenerateReport = async () => {
    try {
      setIsGenerating(true);
      const html = generateReportHTML({
        sales,
        salesPeople,
        testDrives,
        startDate,
        endDate,
      });

      if (Platform.OS === 'web') {
        // För webb, skapa en blob och ladda ner
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `forsaljningsrapport-${startDate.toISOString().split('T')[0]}.html`;
        a.click();
      } else {
        // För mobil, generera PDF
        const { uri } = await Print.printToFileAsync({
          html,
          base64: false,
        });

        await Share.share({
          url: uri,
          title: 'Försäljningsrapport',
          message: 'Här är försäljningsrapporten',
        });
      }
    } catch (error) {
      console.error('Fel vid generering av rapport:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const setDateRangeType = (type: DateRange) => {
    setDateRange(type);
    const now = new Date();

    switch (type) {
      case 'week':
        // Sätt till aktuell vecka
        const monday = new Date(now);
        monday.setDate(now.getDate() - now.getDay() + 1);
        monday.setHours(0, 0, 0, 0);
        setStartDate(monday);
        setEndDate(now);
        break;
      case 'month':
        // Sätt till aktuell månad
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        firstDay.setHours(0, 0, 0, 0);
        setStartDate(firstDay);
        setEndDate(now);
        break;
      case 'custom':
        setShowDatePicker(true);
        break;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{Strings.common.reports}
      

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{Strings.reports.dateRange}
        
        <View style={styles.dateRangeButtons}>
          <Pressable
            style={[styles.rangeButton, dateRange === 'week' && styles.rangeButtonActive]}
            onPress={() => setDateRangeType('week')}
          >
            <Text style={[styles.rangeButtonText, dateRange === 'week' && styles.rangeButtonTextActive]}>
              {Strings.common.week}
            
          

          <Pressable
            style={[styles.rangeButton, dateRange === 'month' && styles.rangeButtonActive]}
            onPress={() => setDateRangeType('month')}
          >
            <Text style={[styles.rangeButtonText, dateRange === 'month' && styles.rangeButtonTextActive]}>
              {Strings.common.month}
            
          

          <Pressable
            style={[styles.rangeButton, dateRange === 'custom' && styles.rangeButtonActive]}
            onPress={() => setDateRangeType('custom')}
          >
            <Text style={[styles.rangeButtonText, dateRange === 'custom' && styles.rangeButtonTextActive]}>
              {Strings.common.custom}
            
          
        

        <Pressable 
          style={styles.dateDisplay}
          onPress={() => setShowDatePicker(true)}
        >
          <Calendar size={20} color={Colors.light.text} />
          <Text style={styles.dateText}>
            {startDate.toLocaleDateString('sv-SE')} - {endDate.toLocaleDateString('sv-SE')}
          
          <ChevronDown size={20} color={Colors.light.text} />
        
      

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{Strings.reports.includeInReport}
        
        <View style={styles.checkboxList}>
          <View style={styles.checkboxItem}>
            <View style={[styles.checkbox, styles.checkboxChecked]} />
            <Text style={styles.checkboxLabel}>{Strings.reports.salesOverview}
          
          
          <View style={styles.checkboxItem}>
            <View style={[styles.checkbox, styles.checkboxChecked]} />
            <Text style={styles.checkboxLabel}>{Strings.reports.salesByBrand}
          
          
          <View style={styles.checkboxItem}>
            <View style={[styles.checkbox, styles.checkboxChecked]} />
            <Text style={styles.checkboxLabel}>{Strings.reports.testDrives}
          
          
          <View style={styles.checkboxItem}>
            <View style={[styles.checkbox, styles.checkboxChecked]} />
            <Text style={styles.checkboxLabel}>{Strings.reports.salesPerformance}
          
        
      

      <View style={styles.reportPreview}>
        <FileText size={48} color={Colors.light.tint} style={styles.previewIcon} />
        <Text style={styles.previewText}>Försäljningsrapport
        <Text style={styles.previewSubtext}>
          {startDate.toLocaleDateString('sv-SE')} - {endDate.toLocaleDateString('sv-SE')}
        
      

      <Pressable 
        style={styles.generateButton} 
        onPress={handleGenerateReport}
        disabled={isGenerating}
      >
        <Download size={24} color="#fff" />
        <Text style={styles.generateButtonText}>
          {isGenerating ? 'Genererar...' : Strings.reports.generate}
        
      

      <DateRangePicker
        visible={showDatePicker}
        startDate={startDate}
        endDate={endDate}
        onClose={() => setShowDatePicker(false)}
        onSave={(start, end) => {
          setStartDate(start);
          setEndDate(end);
          setShowDatePicker(false);
        }}
      />
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 16,
  },
  dateRangeButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  rangeButton: {
    flex: 1,
    backgroundColor: Colors.light.card,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  rangeButtonActive: {
    backgroundColor: Colors.light.tint,
  },
  rangeButtonText: {
    color: Colors.light.text,
    fontWeight: '500',
  },
  rangeButtonTextActive: {
    color: '#fff',
  },
  dateDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.card,
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    color: Colors.light.text,
  },
  checkboxList: {
    gap: 12,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.light.tint,
  },
  checkboxChecked: {
    backgroundColor: Colors.light.tint,
  },
  checkboxLabel: {
    fontSize: 16,
    color: Colors.light.text,
  },
  reportPreview: {
    margin: 16,
    padding: 24,
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    alignItems: 'center',
  },
  previewIcon: {
    marginBottom: 16,
  },
  previewText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 4,
  },
  previewSubtext: {
    fontSize: 14,
    color: '#666',
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.tint,
    margin: 16,
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
```
