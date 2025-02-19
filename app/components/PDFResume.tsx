'use client';

import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { ResumeData } from '../types';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  headerName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  headerContact: {
    fontSize: 12,
    marginBottom: 3,
  },
  experienceItem: {
    marginBottom: 10,
  },
  skillsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  skillsColumn: {
    flex: 1,
    marginRight: 10,
  },
});

interface PDFResumeProps {
  data: ResumeData;
}

export default function PDFResume({ data }: PDFResumeProps) {
  return (
    <PDFViewer style={{ width: '100%', height: '800px' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerName}>{data.name}</Text>
            <Text style={styles.headerContact}>{data.email} | {data.phone}</Text>
          </View>

          {/* Summary */}
          <View style={styles.section}>
            <Text style={styles.title}>Professional Summary</Text>
            <Text style={styles.text}>{data.summary}</Text>
          </View>

          {/* Work Experience */}
          <View style={styles.section}>
            <Text style={styles.title}>Work Experience</Text>
            {data.workExperience.map((exp, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.subtitle}>{exp.position} at {exp.company}</Text>
                <Text style={styles.text}>{exp.startDate} - {exp.endDate}</Text>
                <Text style={styles.text}>{exp.description}</Text>
              </View>
            ))}
          </View>

          {/* Skills */}
          <View style={styles.section}>
            <Text style={styles.title}>Skills</Text>
            <View style={styles.skillsContainer}>
              <View style={styles.skillsColumn}>
                <Text style={styles.subtitle}>Technical Skills</Text>
                {data.skills.technical.map((skill, index) => (
                  <Text key={index} style={styles.text}>• {skill}</Text>
                ))}
              </View>
              <View style={styles.skillsColumn}>
                <Text style={styles.subtitle}>Soft Skills</Text>
                {data.skills.soft.map((skill, index) => (
                  <Text key={index} style={styles.text}>• {skill}</Text>
                ))}
              </View>
            </View>
          </View>

          {/* Accomplishments */}
          <View style={styles.section}>
            <Text style={styles.title}>Accomplishments</Text>
            {data.accomplishments.map((acc, index) => (
              <View key={index} style={styles.experienceItem}>
                <Text style={styles.subtitle}>{acc.title}</Text>
                <Text style={styles.text}>{acc.description}</Text>
              </View>
            ))}
          </View>

          {/* Hobbies */}
          <View style={styles.section}>
            <Text style={styles.title}>Hobbies & Interests</Text>
            {data.hobbies.map((hobby, index) => (
              <Text key={index} style={styles.text}>• {hobby}</Text>
            ))}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}