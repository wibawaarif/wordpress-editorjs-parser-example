"use client";

import React, { useEffect, useState } from "react"
import Head from "next/head"
import dynamic from "next/dynamic"
import Editor from "@/components/Editor/page";
import { parse } from "@wordpress/block-serialization-default-parser";

export default function EditorPage() {
  const [result, setResult] = useState<any>("")
  const [trimmed, setTrimmed] = useState<any>("")

  const stringWordpress = `
  <!-- wp:page/subheading --><h2 class="wp-block-page-subheading">Lesson summary</h2><!-- /wp:page/subheading --><!-- wp:paragraph -->
  <p>This lesson explores the impact that mental illness can have on a person’s overall health and wellbeing, and the coping strategies 
  at can be used to support a person. Students look at the risk and protective factors that can contribute to a person developing a mental illness, and the relationship between
   these factors, mental health and wellbeing, and drug and alcohol use. They will watch two stories from <em>Life After The Oasis</em> as an example of some of the personal
    and social factors that may contribute to a person using drugs and alcohol. Students then look at a range of strategies they can use to support themselves in challenging
     times.</p><!-- /wp:paragraph --><!-- wp:heading {"level":3} --><h3>Learning intentions:</h3><!-- /wp:heading --><!-- wp:heading {"level":4,"className":"blue"}
      --><h4 class="blue">Students will...</h4><!-- /wp:heading --><!-- wp:list --><ul><li>explore the personal and social factors that contribute to health,
       in particular, mental health and wellbeing</li><li>explore various strategies that can be used to manage stress, to support their own and others'
        health and wellbeing</li></ul><!-- /wp:list --><!-- wp:heading {"level":3} --><h3>Success criteria:</h3><!-- /wp:heading --><!-- wp:heading {"level":4,"className":"blue"}
         --><h4 class="blue">Students can...</h4><!-- /wp:heading --><!-- wp:list --><ul><li>identify some of the personal and social factors that may have an impact on the health
          and wellbeing of people</li><li>identify their preferred coping strategies that can be used to help them manage stress and support their health and wellbeing</li></ul><!--
           /wp:list --><!-- wp:page/subheading --><h2 class="wp-block-page-subheading">Lesson guides and printables</h2><!-- /wp:page/subheading --><!-- wp:lesson/learningitemlibrary
            /--><!-- wp:page/subheading --><h2 class="wp-block-page-subheading">Lesson details</h2><!-- /wp:page/subheading --><!-- wp:page/accordion {"heading":"Curriculum mapping"}
             --><div class="wp-block-page-accordion"><!-- wp:paragraph --><p><strong>Australian curriculum content descriptions:</strong>&nbsp;</p><!-- /wp:paragraph --><!-- wp:paragraph
              --><p><strong>Health and Physical Education Year 9 and 10</strong>:</p><!-- /wp:paragraph --><!-- wp:list --><ul><li>Critically analyse and apply health information from\
               a range of sources to health decisions and situations (<a href="https://www.australiancurriculum.edu.au/f-10-curriculum/health-and-physical-education/?strand=Personal,+Social+and+Community+Health&amp;strand=Movement+and+Physical+Activity&amp;capability=ignore&amp;priority=ignore&amp;year=12998&amp;elaborations=true&amp;cd=ACPPS095&amp;searchTerm=ACPPS095#dimension-content" target="_blank" rel="noreferrer noopener">ACPPS095</a>)</li><li>Evaluate factors that shape identities and critically analyse how individuals impact the identities of others (<a href="https://www.australiancurriculum.edu.au/f-10-curriculum/health-and-physical-education/?strand=Personal,+Social+and+Community+Health&amp;strand=Movement+and+Physical+Activity&amp;capability=ignore&amp;priority=ignore&amp;year=12998&amp;elaborations=true&amp;cd=ACPPS089&amp;searchTerm=ACPPS089#dimension-content" target="_blank" rel="noreferrer noopener">ACPPS089</a>)</li></ul><!-- /wp:list --><!-- wp:paragraph --><p><strong>Syllabus outcomes:</strong>&nbsp;<a href="https://www.boardofstudies.nsw.edu.au/syllabus_sc/pdf_doc/pdhpe-7-10-syllabus.pdf" target="_blank" rel="noreferrer noopener">PDHPE5.1, PDHPE5.6, PDHPE5.7, PDHPE5.8</a>.</p><!-- /wp:paragraph --><!-- wp:paragraph --><p><strong>General capabilities:</strong>&nbsp;<a href="https://www.australiancurriculum.edu.au/f-10-curriculum/general-capabilities/literacy/" target="_blank" rel="noreferrer noopener">Literacy</a>,&nbsp;<a href="https://www.australiancurriculum.edu.au/f-10-curriculum/general-capabilities/ethical-understanding/" target="_blank" rel="noreferrer noopener">Ethical Understanding</a>,&nbsp;<a href="https://www.australiancurriculum.edu.au/f-10-curriculum/general-capabilities/personal-and-social-capability/" target="_blank" rel="noreferrer noopener">Personal and social capability</a></p><!-- /wp:paragraph --><!-- wp:paragraph --><p><strong>Relevant parts of Year 9 &amp; 10 achievement standards:</strong>&nbsp; Students critically analyse contextual factors that influence identities, relationships, decisions,&nbsp;and behaviours. Students access, synthesise and apply health information from credible sources to propose and justify responses to health situations.</p><!-- /wp:paragraph --><!-- wp:paragraph --><p><strong>Unit of work:&nbsp;</strong><a href="https://www.coolaustralia.org/unit/life-after-the-oasis-hpe-years-9-10/" target="_blank" rel="noreferrer noopener">Life After The Oasis –&nbsp;HPE</a></p><!-- /wp:paragraph --><!-- wp:paragraph --><p><strong>Time required:</strong>&nbsp;80 mins</p><!-- /wp:paragraph --><!-- wp:paragraph --><p><strong>Level of teacher scaffolding:</strong>&nbsp;Low – facilitate class discussion and swap card activity</p><!-- /wp:paragraph --></div><!-- /wp:page/accordion --><!-- wp:page/accordion {"heading":"Resources required"} --><div class="wp-block-page-accordion"><!-- wp:list --><ul><li>Student Worksheets – one copy per student</li><li>Device capable of presenting a video to the class</li><li><a rel="noreferrer noopener" href="https://prod-media.coolaustralia.org/wp-content/uploads/2019/06/03093445/Oasis2_HandlingSensitiveTopicsFactsheet_FINAL.pdf" target="_blank">Handling Sensitive Topics And Controversial Issues Factsheet</a>&nbsp;– teacher copy (Optional)</li><li>A3&nbsp;<a rel="noreferrer noopener" href="https://prod-media.coolaustralia.org/wp-content/uploads/2019/05/28131132/Oasis2_PlacematThinkingOrganizer_FINAL.pdf" target="_blank">Placemat Thinking Template</a>&nbsp;– one per group</li><li><a rel="noreferrer noopener" href="https://prod-media.coolaustralia.org/wp-content/uploads/2019/06/03113930/Oasis2_RiskProtectiveFactors_FINAL.pdf" target="_blank">Risk And Protective Factors Worksheet</a>&nbsp;– one per student</li><li><a rel="noreferrer noopener" href="https://prod-media.coolaustralia.org/wp-content/uploads/2019/05/28131924/Oasis2_CopingStrategies_FINAL.pdf" target="_blank">Coping Strategy Cards</a>&nbsp;– one per group</li><li><a rel="noreferrer noopener" href="https://prod-media.coolaustralia.org/wp-content/uploads/2018/10/21192017/2040_AgreeDisagreeSigns.pdf" target="_blank">Agree/Disagree Posters</a>&nbsp;– one copy</li></ul><!-- /wp:list --></div><!-- /wp:page/accordion --><!-- wp:page/accordion {"heading":"Skills"} --><div class="wp-block-page-accordion"><!-- wp:paragraph --><p>This lesson is designed to build students’ competencies in the following skills:</p><!-- /wp:paragraph --><!-- wp:list --><ul><li>Collaboration</li><li>Communication</li><li>Critical thinking</li><li>Empathy</li><li>Social skills</li></ul><!-- /wp:list --></div><!-- /wp:page/accordion --><!-- wp:page/accordion {"heading":"Additional info"} --><div class="wp-block-page-accordion"><!-- wp:paragraph --><p>This resource has been adapted from ‘<em>Teaching Social Issues Through English’</em> developed with the English Teachers Association NSW and the ‘<em>Youth Homelessness Matters Resource</em>’ developed by Janice Atkin. You can find these resources here.</p><!-- /wp:paragraph --></div><!-- /wp:page/accordion -->
  `

  const handleChange = (e: any) => {
    e.preventDefault()
    setResult(e.target.value)
  }

  useEffect(() => {
    setTrimmed(parse(result.trim()));
  }, [result])

  const post = parse(stringWordpress.trim());


  return (
    <div>
      <input type="text" onInput={handleChange} className="h-96 w-full bg-gray-300 border-2 border-black text-4xl px-48" />
      <Editor valueToShow={trimmed} />
    </div>
  )
}