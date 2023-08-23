import { type Internship } from 'src/models/itp-post'

export const categoryColor: { [category: string]: string } = {
  'Artifical Intelligence': 'red',
  Backend: 'pink',
  Cybersecurity: 'purple',
  'Data Science': 'deep-purple',
  Frontend: 'indigo',
  'Full Stack': 'blue',
  Gaming: 'light-blue',
  'Internet of Things': 'cyan',
  Networking: 'teal',
}

export const allCategories = [
  'Artifical Intelligence',
  'Backend',
  'Cybersecurity',
  'Data Science',
  'Frontend',
  'Full Stack',
  'Gaming',
  'Internet of Things',
  'Networking',
]

export const minAllowance = 0
export const maxAllowance = 2000

export const allLocations = [
  'Cheras',
  'Mid Valley City',
  'Petaling Jaya',
  'Taman Connaught',
  'Titiwangsa',
  'Wangsa Maju',
]

//   <!-- Title -->
//   <!-- Company name -->

//   <!--
//     IT jobs categories
//     - Artifical Intelligence -- red
//     - Backend -- pink
//     - Cybersecurity -- purple
//     - Data Science -- deep-purple
//     - Frontend -- indigo
//     - Full Stack -- blue
//     - Gaming -- light-blue
//     - Internet of Things -- cyan
//     - Networking -- teal
//   -->

//   <!-- Allowance ranges from RM 0 until RM 2000 and above -->

//   <!-- Locations
//     - Cheras
//     - Mid Valley City
//     - Taman Connaught
//     - Petaling Jaya
//     - Wangsa Maju
//     - Titiwangsa
//   -->

//   <!-- Learning Outcomes -->
//   <!-- Description -->

//   <!-- Company Description -->
//   <!-- Company Photo -->
//   <!-- Company Size -->
//   <!-- Address -->
//   <!-- Company Website -->
export const internships: readonly Internship[] = [
  {
    title: 'Software Engineer',
    company_name: 'CMY Enterprise',
    categories: ['Backend', 'Frontend', 'Full Stack'],
    min_allowance: 500,
    max_allowance: 1200,
    location: 'Cheras',
    learning_outcomes: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Quisque fermentum metus sed nibh pharetra, ac semper arcu tincidunt.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    ],
    description: String.raw`Lorem <b>ipsum</b> dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.

    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.

    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.</div></div>`,
    company_description: String.raw`Lorem <b>ipsum</b> dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.

    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.

    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.</div></div>`,
    company_size: 50,
    address:
      'Axiata Tower, Level 20, 9, Jalan Stesen Sentral 5, Kuala Lumpur Sentral, 50470 Kuala Lumpur, Federal Territory of Kuala Lumpur',
    company_url: 'https://www.tarc.edu.my/',
    vacancy_count: 3,
  },
  {
    title: 'Software Engineer',
    company_name: 'CMY Enterprise',
    categories: ['Backend', 'Frontend', 'Full Stack'],
    min_allowance: 500,
    location: 'Cheras',
    learning_outcomes: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Quisque fermentum metus sed nibh pharetra, ac semper arcu tincidunt.',
    ],
    description: String.raw`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.

    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.

    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.`,
    company_description: String.raw`Lorem <b>ipsum</b> dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.

    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.

    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.</div></div>`,
    company_size: 50,
    address:
      'Axiata Tower, Level 20, 9, Jalan Stesen Sentral 5, Kuala Lumpur Sentral, 50470 Kuala Lumpur, Federal Territory of Kuala Lumpur',
    company_url: 'https://www.tarc.edu.my/',
    vacancy_count: 3,
  },
  {
    title: 'Software Engineer',
    company_name: 'CMY Enterprise',
    categories: ['Backend', 'Frontend', 'Full Stack'],
    location: 'Cheras',
    learning_outcomes: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Quisque fermentum metus sed nibh pharetra, ac semper arcu tincidunt.',
    ],
    description: String.raw`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.

    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.

    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.`,
    company_description: String.raw`Lorem <b>ipsum</b> dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.

    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.

    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.</div></div>`,
    company_size: 50,
    address:
      'Axiata Tower, Level 20, 9, Jalan Stesen Sentral 5, Kuala Lumpur Sentral, 50470 Kuala Lumpur, Federal Territory of Kuala Lumpur',
    company_url: 'https://www.tarc.edu.my/',
    vacancy_count: 3,
  },
  {
    title: 'Software Engineer',
    company_name: 'CMY Enterprise',
    categories: ['Backend', 'Frontend', 'Full Stack'],
    min_allowance: 500,
    max_allowance: 1200,
    location: 'Cheras',
    learning_outcomes: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Quisque fermentum metus sed nibh pharetra, ac semper arcu tincidunt.',
    ],
    description: String.raw`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.

    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.

    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.`,
    company_description: String.raw`Lorem <b>ipsum</b> dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.

    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.

    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.</div></div>`,
    company_size: 50,
    address:
      'Axiata Tower, Level 20, 9, Jalan Stesen Sentral 5, Kuala Lumpur Sentral, 50470 Kuala Lumpur, Federal Territory of Kuala Lumpur',
    company_url: 'https://www.tarc.edu.my/',
    vacancy_count: 3,
  },
  {
    title: 'Software Engineer',
    company_name: 'CMY Enterprise',
    categories: ['Backend', 'Frontend', 'Full Stack'],
    min_allowance: 500,
    max_allowance: 1200,
    location: 'Cheras',
    learning_outcomes: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Quisque fermentum metus sed nibh pharetra, ac semper arcu tincidunt.',
    ],
    description: String.raw`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.

    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.

    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.`,
    company_description: String.raw`Lorem <b>ipsum</b> dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.

    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.

    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.</div></div>`,
    company_size: 50,
    address:
      'Axiata Tower, Level 20, 9, Jalan Stesen Sentral 5, Kuala Lumpur Sentral, 50470 Kuala Lumpur, Federal Territory of Kuala Lumpur',
    company_url: 'https://www.tarc.edu.my/',
    vacancy_count: 3,
  },
  {
    title: 'Software Engineer',
    company_name: 'CMY Enterprise',
    categories: ['Backend', 'Frontend', 'Full Stack'],
    min_allowance: 500,
    max_allowance: 1200,
    location: 'Cheras',
    learning_outcomes: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Quisque fermentum metus sed nibh pharetra, ac semper arcu tincidunt.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    ],
    description: String.raw`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.

    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.

    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.`,
    company_description: String.raw`Lorem <b>ipsum</b> dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.

    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.

    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.</div></div>`,
    company_size: 50,
    address:
      'Axiata Tower, Level 20, 9, Jalan Stesen Sentral 5, Kuala Lumpur Sentral, 50470 Kuala Lumpur, Federal Territory of Kuala Lumpur',
    company_url: 'https://www.tarc.edu.my/',
    vacancy_count: 3,
  },
  {
    title: 'Software Engineer',
    company_name: 'CMY Enterprise',
    categories: ['Backend', 'Frontend', 'Full Stack'],
    min_allowance: 500,
    location: 'Cheras',
    learning_outcomes: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Quisque fermentum metus sed nibh pharetra, ac semper arcu tincidunt.',
    ],
    description: String.raw`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.

    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.

    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.`,
    company_description: String.raw`Lorem <b>ipsum</b> dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.

    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.

    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.</div></div>`,
    company_size: 50,
    address:
      'Axiata Tower, Level 20, 9, Jalan Stesen Sentral 5, Kuala Lumpur Sentral, 50470 Kuala Lumpur, Federal Territory of Kuala Lumpur',
    company_url: 'https://www.tarc.edu.my/',
    vacancy_count: 3,
  },
  {
    title: 'Software Engineer',
    company_name: 'CMY Enterprise',
    categories: ['Backend', 'Frontend', 'Full Stack'],
    location: 'Cheras',
    learning_outcomes: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Quisque fermentum metus sed nibh pharetra, ac semper arcu tincidunt.',
    ],
    description: String.raw`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.

    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.

    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.`,
    company_description: String.raw`Lorem <b>ipsum</b> dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.

    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.

    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.</div></div>`,
    company_size: 50,
    address:
      'Axiata Tower, Level 20, 9, Jalan Stesen Sentral 5, Kuala Lumpur Sentral, 50470 Kuala Lumpur, Federal Territory of Kuala Lumpur',
    company_url: 'https://www.tarc.edu.my/',
    vacancy_count: 3,
  },
  {
    title: 'Software Engineer',
    company_name: 'CMY Enterprise',
    categories: ['Backend', 'Frontend', 'Full Stack'],
    min_allowance: 500,
    max_allowance: 1200,
    location: 'Cheras',
    learning_outcomes: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Quisque fermentum metus sed nibh pharetra, ac semper arcu tincidunt.',
    ],
    description: String.raw`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.

    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.

    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.`,
    company_description: String.raw`Lorem <b>ipsum</b> dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.

    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.

    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.</div></div>`,
    company_size: 50,
    address:
      'Axiata Tower, Level 20, 9, Jalan Stesen Sentral 5, Kuala Lumpur Sentral, 50470 Kuala Lumpur, Federal Territory of Kuala Lumpur',
    company_url: 'https://www.tarc.edu.my/',
    vacancy_count: 3,
  },
  {
    title: 'Software Engineer',
    company_name: 'CMY Enterprise',
    categories: ['Backend', 'Frontend', 'Full Stack'],
    min_allowance: 500,
    max_allowance: 1200,
    location: 'Cheras',
    learning_outcomes: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Quisque fermentum metus sed nibh pharetra, ac semper arcu tincidunt.',
    ],
    description: String.raw`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.

    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.

    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.`,
    company_description: String.raw`Lorem <b>ipsum</b> dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.

    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.

    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.</div></div>`,
    company_size: 50,
    address:
      'Axiata Tower, Level 20, 9, Jalan Stesen Sentral 5, Kuala Lumpur Sentral, 50470 Kuala Lumpur, Federal Territory of Kuala Lumpur',
    company_url: 'https://www.tarc.edu.my/',
    vacancy_count: 3,
  },
  {
    title: 'Software Engineer',
    company_name: 'CMY Enterprise',
    categories: ['Backend', 'Frontend', 'Full Stack'],
    min_allowance: 500,
    max_allowance: 1200,
    location: 'Cheras',
    learning_outcomes: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Quisque fermentum metus sed nibh pharetra, ac semper arcu tincidunt.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    ],
    description: String.raw`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.

    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.

    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.`,
    company_description: String.raw`Lorem <b>ipsum</b> dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.

    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.

    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.</div></div>`,
    company_size: 50,
    address:
      'Axiata Tower, Level 20, 9, Jalan Stesen Sentral 5, Kuala Lumpur Sentral, 50470 Kuala Lumpur, Federal Territory of Kuala Lumpur',
    company_url: 'https://www.tarc.edu.my/',
    vacancy_count: 3,
  },
  {
    title: 'Software Engineer',
    company_name: 'CMY Enterprise',
    categories: ['Backend', 'Frontend', 'Full Stack'],
    min_allowance: 500,
    location: 'Cheras',
    learning_outcomes: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Quisque fermentum metus sed nibh pharetra, ac semper arcu tincidunt.',
    ],
    description: String.raw`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.

    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.

    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.`,
    company_description: String.raw`Lorem <b>ipsum</b> dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.

    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.

    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.</div></div>`,
    company_size: 50,
    address:
      'Axiata Tower, Level 20, 9, Jalan Stesen Sentral 5, Kuala Lumpur Sentral, 50470 Kuala Lumpur, Federal Territory of Kuala Lumpur',
    company_url: 'https://www.tarc.edu.my/',
    vacancy_count: 3,
  },
  {
    title: 'Software Engineer',
    company_name: 'CMY Enterprise',
    categories: ['Backend', 'Frontend', 'Full Stack'],
    location: 'Cheras',
    learning_outcomes: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Quisque fermentum metus sed nibh pharetra, ac semper arcu tincidunt.',
    ],
    description: String.raw`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.

    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.

    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.`,
    company_description: String.raw`Lorem <b>ipsum</b> dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.

    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.

    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.</div></div>`,
    company_size: 50,
    address:
      'Axiata Tower, Level 20, 9, Jalan Stesen Sentral 5, Kuala Lumpur Sentral, 50470 Kuala Lumpur, Federal Territory of Kuala Lumpur',
    company_url: 'https://www.tarc.edu.my/',
    vacancy_count: 3,
  },
  {
    title: 'Software Engineer',
    company_name: 'CMY Enterprise',
    categories: ['Backend', 'Frontend', 'Full Stack'],
    min_allowance: 500,
    max_allowance: 1200,
    location: 'Cheras',
    learning_outcomes: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Quisque fermentum metus sed nibh pharetra, ac semper arcu tincidunt.',
    ],
    description: String.raw`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.

    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.

    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.`,
    company_description: String.raw`Lorem <b>ipsum</b> dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.

    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.

    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.</div></div>`,
    company_size: 50,
    address:
      'Axiata Tower, Level 20, 9, Jalan Stesen Sentral 5, Kuala Lumpur Sentral, 50470 Kuala Lumpur, Federal Territory of Kuala Lumpur',
    company_url: 'https://www.tarc.edu.my/',
    vacancy_count: 3,
  },
  {
    title: 'Software Engineer',
    company_name: 'CMY Enterprise',
    categories: ['Backend', 'Frontend', 'Full Stack'],
    min_allowance: 500,
    max_allowance: 1200,
    location: 'Cheras',
    learning_outcomes: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Quisque fermentum metus sed nibh pharetra, ac semper arcu tincidunt.',
    ],
    description: String.raw`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.

    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.

    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.`,
    company_description: String.raw`Lorem <b>ipsum</b> dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.

    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.

    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.</div></div>`,
    company_size: 50,
    address:
      'Axiata Tower, Level 20, 9, Jalan Stesen Sentral 5, Kuala Lumpur Sentral, 50470 Kuala Lumpur, Federal Territory of Kuala Lumpur',
    company_url: 'https://www.tarc.edu.my/',
    vacancy_count: 3,
  },
  {
    title: 'Software Engineer',
    company_name: 'CMY Enterprise',
    categories: ['Backend', 'Frontend', 'Full Stack'],
    min_allowance: 500,
    max_allowance: 1200,
    location: 'Cheras',
    learning_outcomes: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Quisque fermentum metus sed nibh pharetra, ac semper arcu tincidunt.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    ],
    description: String.raw`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.

    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.

    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.`,
    company_description: String.raw`Lorem <b>ipsum</b> dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.

    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.

    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.</div></div>`,
    company_size: 50,
    address:
      'Axiata Tower, Level 20, 9, Jalan Stesen Sentral 5, Kuala Lumpur Sentral, 50470 Kuala Lumpur, Federal Territory of Kuala Lumpur',
    company_url: 'https://www.tarc.edu.my/',
    vacancy_count: 3,
  },
  {
    title: 'Software Engineer',
    company_name: 'CMY Enterprise',
    categories: ['Backend', 'Frontend', 'Full Stack'],
    min_allowance: 500,
    location: 'Cheras',
    learning_outcomes: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Quisque fermentum metus sed nibh pharetra, ac semper arcu tincidunt.',
    ],
    description: String.raw`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.

    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.

    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.`,
    company_description: String.raw`Lorem <b>ipsum</b> dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.

    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.

    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.</div></div>`,
    company_size: 50,
    address:
      'Axiata Tower, Level 20, 9, Jalan Stesen Sentral 5, Kuala Lumpur Sentral, 50470 Kuala Lumpur, Federal Territory of Kuala Lumpur',
    company_url: 'https://www.tarc.edu.my/',
    vacancy_count: 3,
  },
  {
    title: 'Software Engineer',
    company_name: 'CMY Enterprise',
    categories: ['Backend', 'Frontend', 'Full Stack'],
    location: 'Cheras',
    learning_outcomes: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Quisque fermentum metus sed nibh pharetra, ac semper arcu tincidunt.',
    ],
    description: String.raw`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.

    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.

    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.`,
    company_description: String.raw`Lorem <b>ipsum</b> dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.

    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.

    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.</div></div>`,
    company_size: 50,
    address:
      'Axiata Tower, Level 20, 9, Jalan Stesen Sentral 5, Kuala Lumpur Sentral, 50470 Kuala Lumpur, Federal Territory of Kuala Lumpur',
    company_url: 'https://www.tarc.edu.my/',
    vacancy_count: 3,
  },
  {
    title: 'Software Engineer',
    company_name: 'CMY Enterprise',
    categories: ['Backend', 'Frontend', 'Full Stack'],
    min_allowance: 500,
    max_allowance: 1200,
    location: 'Cheras',
    learning_outcomes: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Quisque fermentum metus sed nibh pharetra, ac semper arcu tincidunt.',
    ],
    description: String.raw`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.

    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.

    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.`,
    company_description: String.raw`Lorem <b>ipsum</b> dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.

    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.

    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.</div></div>`,
    company_size: 50,
    address:
      'Axiata Tower, Level 20, 9, Jalan Stesen Sentral 5, Kuala Lumpur Sentral, 50470 Kuala Lumpur, Federal Territory of Kuala Lumpur',
    company_url: 'https://www.tarc.edu.my/',
    vacancy_count: 3,
  },
  {
    title: 'Software Engineer',
    company_name: 'CMY Enterprise',
    categories: ['Backend', 'Frontend', 'Full Stack'],
    min_allowance: 500,
    max_allowance: 1200,
    location: 'Cheras',
    learning_outcomes: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Quisque fermentum metus sed nibh pharetra, ac semper arcu tincidunt.',
    ],
    description: String.raw`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.

    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.

    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.`,
    company_description: String.raw`Lorem <b>ipsum</b> dolor sit amet, consectetur adipiscing elit. Proin ac leo vel neque finibus tincidunt in id odio. Aenean ut lacus mauris. Morbi sed elit eu erat lacinia facilisis. Cras suscipit, tortor posuere congue gravida, enim lorem consequat quam, non imperdiet sapien ex eu purus. Pellentesque vitae dui non risus rhoncus pretium. Sed ultricies dolor non rutrum dapibus. In id libero in purus blandit tincidunt vel nec enim. Curabitur accumsan lacus risus, eu dapibus lorem efficitur ornare. Vestibulum quis lorem a magna pulvinar ultrices. Nullam elementum facilisis ligula, et placerat odio congue a. Vivamus tempor sagittis dui, pharetra laoreet risus fermentum non.

    <div><br><div>In neque ex, pellentesque vitae magna at, efficitur vulputate nunc. Phasellus nibh nulla, rutrum sed velit non, tristique tempus lacus. Quisque tristique euismod orci, faucibus aliquet magna vestibulum vulputate. Praesent vehicula sodales est sit amet bibendum. Ut dictum bibendum hendrerit. Suspendisse sit amet nisl quis tellus placerat fermentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse interdum dapibus diam non lacinia. Proin a luctus ex. Curabitur mollis mollis consequat.

    <div><br><div>Morbi ac quam odio. Vivamus vel tincidunt sapien, ut aliquam velit. Cras eget sem ac justo tristique tempus a at risus. Phasellus faucibus, sapien ut mattis mattis, dui nunc aliquam leo, sed consectetur dolor quam quis justo. Morbi ut massa elit. Nunc venenatis fermentum lobortis. Nunc accumsan orci magna. Donec ante sapien, ornare a orci vitae, condimentum faucibus dolor.</div></div>`,
    company_size: 50,
    address:
      'Axiata Tower, Level 20, 9, Jalan Stesen Sentral 5, Kuala Lumpur Sentral, 50470 Kuala Lumpur, Federal Territory of Kuala Lumpur',
    company_url: 'https://www.tarc.edu.my/',
    vacancy_count: 3,
  },
]

export const applications = [
  {
    title: 'Software Engineer',
    company_name: 'CMY Enterprise',
    status: 'pending',
    note_to_employer: 'hihi',
    resume_url: 'https://www.tarc.edu.my/favicon.png',
  },
  {
    title: 'Software Engineer',
    company_name: 'CMY Enterprise',
    status: 'accepted',
    note_to_employer: '',
    resume_url: 'https://www.tarc.edu.my/favicon.png',
  },
  {
    title: 'Software Engineer',
    company_name: 'CMY Enterprise',
    status: 'rejected',
    note_to_employer: 'hihi',
    resume_url: 'https://www.tarc.edu.my/favicon.png',
  },
  {
    title: 'Software Engineer',
    company_name: 'CMY Enterprise',
    status: 'pending',
    note_to_employer: '',
    resume_url: 'https://www.tarc.edu.my/favicon.png',
  },
  {
    title: 'Software Engineer',
    company_name: 'CMY Enterprise',
    status: 'pending',
    note_to_employer: 'hihi',
    resume_url: 'https://www.tarc.edu.my/favicon.png',
  },
]

export const incomingApplications = [
  {
    title: 'Software Engineer',
    student_name: 'Yong Chi Min',
    status: 'pending',
    note_to_employer: 'hihi',
    resume_url: 'https://www.tarc.edu.my/favicon.png',
  },
  {
    title: 'Software Engineer',
    student_name: 'Yong Chi Min',
    status: 'accepted',
    note_to_employer: '',
    resume_url: 'https://www.tarc.edu.my/favicon.png',
  },
  {
    title: 'Software Engineer',
    student_name: 'Yong Chi Min',
    status: 'rejected',
    note_to_employer: 'hihi',
    resume_url: 'https://www.tarc.edu.my/favicon.png',
  },
  {
    title: 'Software Engineer',
    student_name: 'Yong Chi Min',
    status: 'pending',
    note_to_employer: '',
    resume_url: 'https://www.tarc.edu.my/favicon.png',
  },
  {
    title: 'Software Engineer',
    student_name: 'Yong Chi Min',
    status: 'pending',
    note_to_employer: 'hihi',
    resume_url: 'https://www.tarc.edu.my/favicon.png',
  },
]
