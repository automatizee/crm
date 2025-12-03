import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Criar usuário admin padrão
  const hashedPassword = await bcrypt.hash('admin123', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@clinica.com' },
    update: {},
    create: {
      email: 'admin@clinica.com',
      password: hashedPassword,
      name: 'Administrador',
      role: 'ADMIN',
    },
  })

  console.log('✅ Admin user created:', admin.email)

  // Criar configurações padrão
  const settings = await prisma.settings.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      clinicName: 'Clínica de Terapia e Coaching',
      clinicEmail: 'contato@clinica.com',
      clinicPhone: '(11) 99999-9999',
      defaultSessionPrice: 150.00,
    },
  })

  console.log('✅ Settings created:', settings.clinicName)

  // Criar horários de trabalho padrão (Segunda a Sexta, 9h-18h)
  const workingHours = []
  for (let day = 1; day <= 5; day++) {
    const hours = await prisma.workingHours.create({
      data: {
        dayOfWeek: day,
        startTime: '09:00',
        endTime: '18:00',
        isActive: true,
      },
    })
    workingHours.push(hours)
  }

  console.log('✅ Working hours created:', workingHours.length, 'days')

  // Criar pacotes de sessões padrão
  const packages = await Promise.all([
    prisma.sessionPackage.create({
      data: {
        name: 'Pacote 4 Sessões',
        sessions: 4,
        price: 560.00, // 5% desconto
        validityDays: 60,
      },
    }),
    prisma.sessionPackage.create({
      data: {
        name: 'Pacote 8 Sessões',
        sessions: 8,
        price: 1080.00, // 10% desconto
        validityDays: 90,
      },
    }),
    prisma.sessionPackage.create({
      data: {
        name: 'Pacote 12 Sessões',
        sessions: 12,
        price: 1530.00, // 15% desconto
        validityDays: 120,
      },
    }),
  ])

  console.log('✅ Session packages created:', packages.length)

  // Criar alguns clientes de exemplo
  const clients = await Promise.all([
    prisma.client.create({
      data: {
        name: 'Maria Silva',
        email: 'maria.silva@example.com',
        phone: '(11) 98765-4321',
        birthDate: new Date('1985-03-15'),
        cpf: '123.456.789-00',
        address: 'Rua das Flores, 123',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567',
        status: 'ACTIVE',
      },
    }),
    prisma.client.create({
      data: {
        name: 'João Santos',
        email: 'joao.santos@example.com',
        phone: '(11) 97654-3210',
        birthDate: new Date('1990-07-22'),
        status: 'ACTIVE',
      },
    }),
    prisma.client.create({
      data: {
        name: 'Ana Costa',
        email: 'ana.costa@example.com',
        phone: '(11) 96543-2109',
        birthDate: new Date('1988-11-30'),
        status: 'ACTIVE',
      },
    }),
  ])

  console.log('✅ Clients created:', clients.length)

  // Criar alguns agendamentos de exemplo
  const now = new Date()
  const tomorrow = new Date(now)
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(10, 0, 0, 0)

  const nextWeek = new Date(now)
  nextWeek.setDate(nextWeek.getDate() + 7)
  nextWeek.setHours(14, 0, 0, 0)

  const appointments = await Promise.all([
    prisma.appointment.create({
      data: {
        clientId: clients[0].id,
        date: tomorrow,
        duration: 60,
        type: 'INDIVIDUAL_THERAPY',
        status: 'CONFIRMED',
        price: 150.00,
        notes: 'Primeira sessão',
      },
    }),
    prisma.appointment.create({
      data: {
        clientId: clients[1].id,
        date: nextWeek,
        duration: 60,
        type: 'COACHING',
        status: 'SCHEDULED',
        price: 150.00,
      },
    }),
  ])

  console.log('✅ Appointments created:', appointments.length)

  console.log('🎉 Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
