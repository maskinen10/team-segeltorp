import { useState } from 'react';
import { Modal, View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { X, Calendar, ChevronLeft, ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { Strings } from '@/constants/strings';

interface Props {
  visible: boolean;
  startDate: Date;
  endDate: Date;
  onClose: () => void;
  onSave: (startDate: Date, endDate: Date) => void;
}

export default function DateRangePicker({ visible, startDate, endDate, onClose, onSave }: Props) {
  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);
  const [currentMonth, setCurrentMonth] = useState(new Date(startDate));
  const [selectingStart, setSelectingStart] = useState(true);

  const handleSave = () => {
    // Säkerställ att startDate är före endDate
    if (tempStartDate > tempEndDate) {
      const temp = tempStartDate;
      setTempStartDate(tempEndDate);
      setTempEndDate(temp);
    }
    onSave(tempStartDate, tempEndDate);
  };

  const handleDateSelect = (date: Date) => {
    if (selectingStart) {
      setTempStartDate(date);
      setSelectingStart(false);
    } else {
      setTempEndDate(date);
      setSelectingStart(true);
    }
  };

  const prevMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() - 1);
    setCurrentMonth(newMonth);
  };

  const nextMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Första dagen i månaden
    const firstDay = new Date(year, month, 1);
    // Sista dagen i månaden
    const lastDay = new Date(year, month + 1, 0);
    
    // Veckodag för första dagen (0 = söndag, 1 = måndag, etc.)
    let firstDayOfWeek = firstDay.getDay();
    // Anpassa för att veckan börjar på måndag i Sverige
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    
    // Antal dagar i månaden
    const daysInMonth = lastDay.getDate();
    
    // Skapa kalenderrutnät
    const days = [];
    
    // Lägg till veckodagsrubriker
    const weekdays = ['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'];
    weekdays.forEach(day => {
      days.push(
        <View key={`header-${day}`} style={styles.calendarHeaderCell}>
          <Text style={styles.calendarHeaderText}>{day}</Text>
        </View>
      );
    });
    
    // Lägg till tomma celler för dagar före första dagen i månaden
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<View key={`empty-${i}`} style={styles.calendarCell} />);
    }
    
    // Lägg till dagar i månaden
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isStartDate = date.toDateString() === tempStartDate.toDateString();
      const isEndDate = date.toDateString() === tempEndDate.toDateString();
      const isInRange = date >= tempStartDate && date <= tempEndDate;
      
      days.push(
        <Pressable
          key={`day-${day}`}
          style={[
            styles.calendarCell,
            isStartDate && styles.startDateCell,
            isEndDate && styles.endDateCell,
            isInRange && !isStartDate && !isEndDate && styles.inRangeCell
          ]}
          onPress={() => handleDateSelect(date)}
        >
          <Text style={[
            styles.calendarCellText,
            (isStartDate || isEndDate) && styles.selectedDateText
          ]}>
            {day}
          </Text>
        </Pressable>
      );
    }
    
    return (
      <View style={styles.calendarContainer}>
        <View style={styles.calendarHeader}>
          <Pressable onPress={prevMonth} style={styles.calendarNavButton}>
            <ChevronLeft size={24} color={Colors.light.text} />
          </Pressable>
          <Text style={styles.calendarTitle}>
            {currentMonth.toLocaleDateString('sv-SE', { month: 'long', year: 'numeric' })}
          </Text>
          <Pressable onPress={nextMonth} style={styles.calendarNavButton}>
            <ChevronRight size={24} color={Colors.light.text} />
          </Pressable>
        </View>
        <View style={styles.calendarGrid}>
          {days}
        </View>
      </View>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{Strings.reports.selectDateRange}</Text>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <X size={24} color={Colors.light.text} />
          </Pressable>
        </View>

        <View style={styles.content}>
          <View style={styles.selectionInfo}>
            <View style={styles.dateInfoContainer}>
              <Text style={styles.dateInfoLabel}>{Strings.common.startDate}</Text>
              <Text style={styles.dateInfoValue}>
                {tempStartDate.toLocaleDateString('sv-SE')}
              </Text>
            </View>
            <View style={styles.dateInfoContainer}>
              <Text style={styles.dateInfoLabel}>{Strings.common.endDate}</Text>
              <Text style={styles.dateInfoValue}>
                {tempEndDate.toLocaleDateString('sv-SE')}
              </Text>
            </View>
          </View>

          <Text style={styles.selectionHint}>
            {selectingStart ? 'Välj startdatum' : 'Välj slutdatum'}
          </Text>

          {renderCalendar()}

          <View style={styles.quickSelections}>
            <Pressable 
              style={styles.quickButton}
              onPress={() => {
                const today = new Date();
                const weekStart = new Date(today);
                weekStart.setDate(today.getDate() - today.getDay() + 1);
                weekStart.setHours(0, 0, 0, 0);
                
                setTempStartDate(weekStart);
                setTempEndDate(today);
                setCurrentMonth(weekStart);
              }}
            >
              <Text style={styles.quickButtonText}>Denna vecka</Text>
            </Pressable>
            
            <Pressable 
              style={styles.quickButton}
              onPress={() => {
                const today = new Date();
                const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
                
                setTempStartDate(monthStart);
                setTempEndDate(today);
                setCurrentMonth(monthStart);
              }}
            >
              <Text style={styles.quickButtonText}>Denna månad</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.footer}>
          <Pressable style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>{Strings.common.cancel}</Text>
          </Pressable>
          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>{Strings.common.save}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  selectionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  dateInfoContainer: {
    flex: 1,
    padding: 12,
    backgroundColor: Colors.light.card,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  dateInfoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  dateInfoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.text,
  },
  selectionHint: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  calendarContainer: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  calendarTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  calendarNavButton: {
    padding: 8,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarHeaderCell: {
    width: '14.28%',
    padding: 8,
    alignItems: 'center',
  },
  calendarHeaderText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  calendarCell: {
    width: '14.28%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarCellText: {
    fontSize: 14,
    color: Colors.light.text,
  },
  startDateCell: {
    backgroundColor: Colors.light.tint,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  endDateCell: {
    backgroundColor: Colors.light.tint,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  inRangeCell: {
    backgroundColor: `${Colors.light.tint}33`, // 20% opacity
  },
  selectedDateText: {
    color: '#fff',
    fontWeight: '600',
  },
  quickSelections: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  quickButton: {
    flex: 1,
    backgroundColor: Colors.light.card,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  quickButtonText: {
    fontSize: 14,
    color: Colors.light.text,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    gap: 8,
  },
  cancelButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: Colors.light.card,
  },
  cancelButtonText: {
    color: Colors.light.text,
    fontSize: 16,
    fontWeight: '500',
  },
  saveButton: {
    flex: 1,
    backgroundColor: Colors.light.tint,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
